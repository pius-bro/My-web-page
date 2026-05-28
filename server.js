/**
 * Kenya Airways Booking System — Backend Server
 * Pure Node.js (no npm packages needed)
 * Run: node server.js
 * Server starts on http://localhost:5000
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');
const url  = require('url');

const PORT = 3000;
const DB_FILE = path.join(__dirname, 'db.json');
const PUBLIC  = path.join(__dirname, 'public');

// ─── DATABASE HELPERS ────────────────────────────────────────────────────────

function readDB() {
    try {
        return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    } catch (e) {
        console.error('DB read error:', e.message);
        return null;
    }
}

function writeDB(data) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (e) {
        console.error('DB write error:', e.message);
        return false;
    }
}

function nextId(db, counter, prefix) {
    db.counters[counter]++;
    writeDB(db);
    return `${prefix}-${db.counters[counter]}`;
}

// ─── HTTP HELPERS ─────────────────────────────────────────────────────────────

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try { resolve(body ? JSON.parse(body) : {}); }
            catch (e) { reject(e); }
        });
        req.on('error', reject);
    });
}

function send(res, status, data) {
    const body = JSON.stringify(data);
    res.writeHead(status, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(body);
}

function ok(res, data, message = 'Success') {
    send(res, 200, { success: true, message, data });
}

function created(res, data, message = 'Created') {
    send(res, 201, { success: true, message, data });
}

function badRequest(res, message = 'Bad request') {
    send(res, 400, { success: false, message });
}

function notFound(res, message = 'Not found') {
    send(res, 404, { success: false, message });
}

function serverError(res, message = 'Server error') {
    send(res, 500, { success: false, message });
}

// ─── STATIC FILE SERVER ───────────────────────────────────────────────────────

const MIME = {
    '.html': 'text/html',
    '.css':  'text/css',
    '.js':   'application/javascript',
    '.json': 'application/json',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif':  'image/gif',
    '.svg':  'image/svg+xml',
    '.mp4':  'video/mp4',
    '.ico':  'image/x-icon'
};

function serveStatic(req, res, filePath) {
    const ext  = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404); res.end('Not found');
        } else {
            res.writeHead(200, { 'Content-Type': mime });
            res.end(data);
        }
    });
}

// ─── VALIDATION ───────────────────────────────────────────────────────────────

function validate(fields, body) {
    for (const f of fields) {
        if (!body[f] || String(body[f]).trim() === '') {
            return `Field "${f}" is required`;
        }
    }
    return null;
}

// ─── ROUTER ───────────────────────────────────────────────────────────────────

async function router(req, res) {
    const parsed   = url.parse(req.url, true);
    const pathname = parsed.pathname;
    const method   = req.method.toUpperCase();
    const query    = parsed.query;

    // CORS preflight
    if (method === 'OPTIONS') {
        send(res, 204, {});
        return;
    }

    // ── Serve static files from /public ──
    if (!pathname.startsWith('/api/')) {
        let filePath = path.join(PUBLIC, pathname === '/' ? 'index.html' : pathname);
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            serveStatic(req, res, filePath);
        } else {
            // fallback to index.html for SPA
            const indexPath = path.join(PUBLIC, 'index.html');
            if (fs.existsSync(indexPath)) {
                serveStatic(req, res, indexPath);
            } else {
                res.writeHead(404); res.end('Not found');
            }
        }
        return;
    }

    // ── API Routes ──
    let body = {};
    if (['POST', 'PUT'].includes(method)) {
        try { body = await parseBody(req); }
        catch (e) { return badRequest(res, 'Invalid JSON body'); }
    }

    const db = readDB();
    if (!db) return serverError(res, 'Database unavailable');

    // ─────────────────────────────────────────────────
    // BOOKINGS
    // ─────────────────────────────────────────────────

    // GET /api/bookings — list all or filter by ?status= or ?email=
    if (pathname === '/api/bookings' && method === 'GET') {
        let list = db.bookings;
        if (query.status) list = list.filter(b => b.status.toLowerCase() === query.status.toLowerCase());
        if (query.email)  list = list.filter(b => b.email.toLowerCase() === query.email.toLowerCase());
        if (query.search) {
            const s = query.search.toLowerCase();
            list = list.filter(b =>
                b.id.toLowerCase().includes(s) ||
                b.passengerName.toLowerCase().includes(s) ||
                b.email.toLowerCase().includes(s)
            );
        }
        return ok(res, list, `${list.length} booking(s) found`);
    }

    // GET /api/bookings/:id
    if (pathname.match(/^\/api\/bookings\/[^/]+$/) && method === 'GET') {
        const id = pathname.split('/')[3];
        const b  = db.bookings.find(x => x.id === id);
        if (!b) return notFound(res, `Booking ${id} not found`);
        return ok(res, b);
    }

    // POST /api/bookings — add new booking
    if (pathname === '/api/bookings' && method === 'POST') {
        const err = validate(['passengerName', 'from', 'to', 'date', 'class', 'email'], body);
        if (err) return badRequest(res, err);

        const classNames = { A: 'Executive', B: 'Middle Class', C: 'Low Class' };
        if (!classNames[body.class]) return badRequest(res, 'Invalid class. Use A, B, or C');

        // Check seat availability
        const cap = db.seatCapacity[body.class];
        if (cap.booked >= cap.total) {
            return send(res, 409, {
                success: false,
                message: `Class ${body.class} is fully booked`,
                nextAvailable: cap.nextAvailable
            });
        }

        const id = `KQ-${++db.counters.booking}`;
        const booking = {
            id,
            passengerName: body.passengerName.trim(),
            passport:      (body.passport || '').trim(),
            from:          body.from,
            to:            body.to,
            date:          body.date,
            class:         body.class,
            className:     classNames[body.class],
            pax:           parseInt(body.pax) || 1,
            email:         body.email.trim().toLowerCase(),
            status:        'Confirmed',
            createdAt:     new Date().toISOString()
        };

        db.bookings.push(booking);
        // Update seat count
        db.seatCapacity[body.class].booked += booking.pax;
        writeDB(db);
        return created(res, booking, `Booking ${id} confirmed`);
    }

    // PUT /api/bookings/:id — change booking
    if (pathname.match(/^\/api\/bookings\/[^/]+$/) && method === 'PUT') {
        const id = pathname.split('/')[3];
        const idx = db.bookings.findIndex(x => x.id === id);
        if (idx === -1) return notFound(res, `Booking ${id} not found`);

        const b = db.bookings[idx];
        if (body.date)   b.date   = body.date;
        if (body.class) {
            const classNames = { A: 'Executive', B: 'Middle Class', C: 'Low Class' };
            if (!classNames[body.class]) return badRequest(res, 'Invalid class');
            // Restore old seat count, apply new
            db.seatCapacity[b.class].booked   = Math.max(0, db.seatCapacity[b.class].booked - b.pax);
            db.seatCapacity[body.class].booked += b.pax;
            b.class     = body.class;
            b.className = classNames[body.class];
        }
        if (body.reason) b.changeReason = body.reason;
        b.updatedAt = new Date().toISOString();
        db.bookings[idx] = b;
        writeDB(db);
        return ok(res, b, `Booking ${id} updated`);
    }

    // DELETE /api/bookings/:id
    if (pathname.match(/^\/api\/bookings\/[^/]+$/) && method === 'DELETE') {
        const id  = pathname.split('/')[3];
        const idx = db.bookings.findIndex(x => x.id === id);
        if (idx === -1) return notFound(res, `Booking ${id} not found`);
        const b = db.bookings[idx];
        // Restore seat count
        db.seatCapacity[b.class].booked = Math.max(0, db.seatCapacity[b.class].booked - b.pax);
        db.bookings.splice(idx, 1);
        writeDB(db);
        return ok(res, { id }, `Booking ${id} deleted`);
    }

    // ─────────────────────────────────────────────────
    // PASSENGERS
    // ─────────────────────────────────────────────────

    // GET /api/passengers
    if (pathname === '/api/passengers' && method === 'GET') {
        let list = db.passengers;
        if (query.search) {
            const s = query.search.toLowerCase();
            list = list.filter(p =>
                (p.first + ' ' + p.last).toLowerCase().includes(s) ||
                p.passport.toLowerCase().includes(s)
            );
        }
        return ok(res, list, `${list.length} passenger(s) found`);
    }

    // POST /api/passengers
    if (pathname === '/api/passengers' && method === 'POST') {
        const err = validate(['first', 'last', 'passport'], body);
        if (err) return badRequest(res, err);

        // Check duplicate passport
        if (db.passengers.find(p => p.passport === body.passport.trim())) {
            return badRequest(res, `Passenger with passport ${body.passport} already exists`);
        }

        const id = `P-${String(++db.counters.passenger).padStart(3, '0')}`;
        const passenger = {
            id,
            first:       body.first.trim(),
            last:        body.last.trim(),
            passport:    body.passport.trim(),
            nationality: body.nationality || 'Kenyan',
            createdAt:   new Date().toISOString()
        };
        db.passengers.push(passenger);
        writeDB(db);
        return created(res, passenger, `Passenger ${passenger.first} ${passenger.last} added`);
    }

    // PUT /api/passengers/:id
    if (pathname.match(/^\/api\/passengers\/[^/]+$/) && method === 'PUT') {
        const id  = pathname.split('/')[3];
        const idx = db.passengers.findIndex(x => x.id === id);
        if (idx === -1) return notFound(res, `Passenger ${id} not found`);
        const p = db.passengers[idx];
        if (body.first)       p.first       = body.first.trim();
        if (body.last)        p.last        = body.last.trim();
        if (body.passport)    p.passport    = body.passport.trim();
        if (body.nationality) p.nationality = body.nationality;
        p.updatedAt = new Date().toISOString();
        db.passengers[idx] = p;
        writeDB(db);
        return ok(res, p, `Passenger ${id} updated`);
    }

    // DELETE /api/passengers/:id
    if (pathname.match(/^\/api\/passengers\/[^/]+$/) && method === 'DELETE') {
        const id  = pathname.split('/')[3];
        const idx = db.passengers.findIndex(x => x.id === id);
        if (idx === -1) return notFound(res, `Passenger ${id} not found`);
        db.passengers.splice(idx, 1);
        writeDB(db);
        return ok(res, { id }, `Passenger ${id} deleted`);
    }

    // ─────────────────────────────────────────────────
    // INQUIRIES
    // ─────────────────────────────────────────────────

    // GET /api/inquiries
    if (pathname === '/api/inquiries' && method === 'GET') {
        let list = db.inquiries;
        if (query.type) list = list.filter(i => i.type === query.type);
        return ok(res, list, `${list.length} inquir(ies) found`);
    }

    // POST /api/inquiries
    if (pathname === '/api/inquiries' && method === 'POST') {
        const err = validate(['bookingRef', 'type', 'message'], body);
        if (err) return badRequest(res, err);

        const validTypes = ['add', 'change', 'delete'];
        if (!validTypes.includes(body.type)) {
            return badRequest(res, 'type must be one of: add, change, delete');
        }

        const id = `IQ-${String(++db.counters.inquiry + 5000)}`;
        const inquiry = {
            id,
            bookingRef: body.bookingRef.trim(),
            type:       body.type,
            message:    body.message.trim(),
            status:     'Pending',
            createdAt:  new Date().toISOString()
        };
        db.inquiries.push(inquiry);
        writeDB(db);
        return created(res, inquiry, `Inquiry ${id} submitted`);
    }

    // PUT /api/inquiries/:id  (resolve/update status)
    if (pathname.match(/^\/api\/inquiries\/[^/]+$/) && method === 'PUT') {
        const id  = pathname.split('/')[3];
        const idx = db.inquiries.findIndex(x => x.id === id);
        if (idx === -1) return notFound(res, `Inquiry ${id} not found`);
        if (body.status) db.inquiries[idx].status = body.status;
        db.inquiries[idx].updatedAt = new Date().toISOString();
        writeDB(db);
        return ok(res, db.inquiries[idx], `Inquiry ${id} updated`);
    }

    // ─────────────────────────────────────────────────
    // EMPLOYEES
    // ─────────────────────────────────────────────────

    // GET /api/employees
    if (pathname === '/api/employees' && method === 'GET') {
        return ok(res, db.employees, `${db.employees.length} employee(s) found`);
    }

    // POST /api/employees  (match to flight)
    if (pathname === '/api/employees' && method === 'POST') {
        const err = validate(['name', 'role', 'flight', 'shift'], body);
        if (err) return badRequest(res, err);

        const id = `E-${String(++db.counters.employee).padStart(3, '0')}`;
        const employee = {
            id,
            name:       body.name.trim(),
            role:       body.role,
            flight:     body.flight,
            shift:      body.shift,
            status:     'Assigned',
            assignedAt: new Date().toISOString()
        };
        db.employees.push(employee);
        writeDB(db);
        return created(res, employee, `${body.name} assigned to ${body.flight}`);
    }

    // DELETE /api/employees/:id
    if (pathname.match(/^\/api\/employees\/[^/]+$/) && method === 'DELETE') {
        const id  = pathname.split('/')[3];
        const idx = db.employees.findIndex(x => x.id === id);
        if (idx === -1) return notFound(res, `Employee record ${id} not found`);
        db.employees.splice(idx, 1);
        writeDB(db);
        return ok(res, { id }, `Employee record ${id} removed`);
    }

    // ─────────────────────────────────────────────────
    // SEAT CAPACITY
    // ─────────────────────────────────────────────────

    // GET /api/capacity
    if (pathname === '/api/capacity' && method === 'GET') {
        const cap = db.seatCapacity;
        const result = {};
        for (const cls of ['A', 'B', 'C']) {
            const c = cap[cls];
            result[cls] = {
                total:         c.total,
                booked:        c.booked,
                available:     c.total - c.booked,
                isFull:        c.booked >= c.total,
                percentFull:   Math.round((c.booked / c.total) * 100),
                nextAvailable: c.nextAvailable
            };
        }
        return ok(res, result, 'Seat capacity fetched');
    }

    // ─────────────────────────────────────────────────
    // SUBSCRIBERS
    // ─────────────────────────────────────────────────

    // ─────────────────────────────────────────────────
    // USER AUTH
    // ─────────────────────────────────────────────────

    // POST /api/user/register
    if (pathname === '/api/user/register' && method === 'POST') {
        const err = validate(['first','last','email','password'], body);
        if (err) return badRequest(res, err);

        const email = body.email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return badRequest(res, 'Invalid email address');
        if (body.password.length < 6) return badRequest(res, 'Password must be at least 6 characters');

        if (!db.users) db.users = [];
        if (db.users.find(u => u.email === email))
            return badRequest(res, 'An account with this email already exists');

        if (!db.counters.user) db.counters.user = 0;
        db.counters.user++;
        const user = {
            id:        `U-${String(db.counters.user).padStart(4,'0')}`,
            first:     body.first.trim(),
            last:      body.last.trim(),
            email,
            phone:     (body.phone || '').trim(),
            password:  body.password,   // plain text (for simplicity — no npm crypto)
            createdAt: new Date().toISOString()
        };
        db.users.push(user);
        writeDB(db);
        return created(res, { id: user.id, email: user.email }, 'Account created successfully');
    }

    // POST /api/user/login
    if (pathname === '/api/user/login' && method === 'POST') {
        const err = validate(['email','password'], body);
        if (err) return badRequest(res, err);

        if (!db.users) db.users = [];
        const email = body.email.trim().toLowerCase();
        const user  = db.users.find(u => u.email === email && u.password === body.password.trim());
        if (!user) return send(res, 401, { success: false, message: 'Invalid email or password' });

        return ok(res, {
            id:    user.id,
            first: user.first,
            last:  user.last,
            email: user.email,
            phone: user.phone,
            loginAt: new Date().toISOString()
        }, `Welcome back, ${user.first}!`);
    }

    // GET /api/user/profile — get user profile by id
    if (pathname.match(/^\/api\/user\/[^/]+$/) && method === 'GET') {
        const id = pathname.split('/')[3];
        if (!db.users) return notFound(res, 'User not found');
        const user = db.users.find(u => u.id === id);
        if (!user) return notFound(res, 'User not found');
        const { password, ...safe } = user;
        return ok(res, safe, 'Profile loaded');
    }

    // PUT /api/user/:id — update profile
    if (pathname.match(/^\/api\/user\/[^/]+$/) && method === 'PUT') {
        const id  = pathname.split('/')[3];
        if (!db.users) return notFound(res, 'User not found');
        const idx = db.users.findIndex(u => u.id === id);
        if (idx === -1) return notFound(res, 'User not found');
        const u = db.users[idx];
        if (body.first) u.first = body.first.trim();
        if (body.last)  u.last  = body.last.trim();
        if (body.phone) u.phone = body.phone.trim();
        if (body.password && body.password.length >= 6) u.password = body.password;
        u.updatedAt = new Date().toISOString();
        db.users[idx] = u;
        writeDB(db);
        const { password, ...safe } = u;
        return ok(res, safe, 'Profile updated');
    }

    // GET /api/users — admin: list all users
    if (pathname === '/api/users' && method === 'GET') {
        const list = (db.users || []).map(({ password, ...u }) => u);
        return ok(res, list, `${list.length} user(s)`);
    }

    // ─────────────────────────────────────────────────
    // POST /api/subscribe
    if (pathname === '/api/subscribe' && method === 'POST') {
        const err = validate(['email'], body);
        if (err) return badRequest(res, err);

        const email = body.email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return badRequest(res, 'Invalid email address');

        if (db.subscribers.find(s => s.email === email)) {
            return badRequest(res, 'This email is already subscribed');
        }
        db.subscribers.push({ email, subscribedAt: new Date().toISOString() });
        writeDB(db);
        return created(res, { email }, `${email} subscribed successfully`);
    }

    // ─────────────────────────────────────────────────
    // USABILITY EVALUATIONS
    // ─────────────────────────────────────────────────

    // POST /api/evaluate
    if (pathname === '/api/evaluate' && method === 'POST') {
        const err = validate(['rating'], body);
        if (err) return badRequest(res, err);

        const rating = parseInt(body.rating);
        if (rating < 1 || rating > 5) return badRequest(res, 'Rating must be between 1 and 5');

        const evaluation = {
            id:        `EV-${Date.now()}`,
            rating,
            feedback:  (body.feedback || '').trim(),
            createdAt: new Date().toISOString()
        };
        db.evaluations.push(evaluation);
        writeDB(db);
        return created(res, evaluation, 'Evaluation submitted. Thank you!');
    }

    // GET /api/evaluate — summary stats
    if (pathname === '/api/evaluate' && method === 'GET') {
        const evals = db.evaluations;
        if (evals.length === 0) return ok(res, { count: 0, average: 0, breakdown: {} }, 'No evaluations yet');
        const avg = evals.reduce((s, e) => s + e.rating, 0) / evals.length;
        const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        evals.forEach(e => breakdown[e.rating]++);
        return ok(res, { count: evals.length, average: Math.round(avg * 10) / 10, breakdown }, 'Evaluation stats');
    }

    // ─────────────────────────────────────────────────
    // REPORTS
    // ─────────────────────────────────────────────────

    // GET /api/reports/tickets
    if (pathname === '/api/reports/tickets' && method === 'GET') {
        const list = db.bookings;
        const summary = {
            total:     list.length,
            confirmed: list.filter(b => b.status === 'Confirmed').length,
            cancelled: list.filter(b => b.status === 'Cancelled').length,
            byClass: {
                A: list.filter(b => b.class === 'A').length,
                B: list.filter(b => b.class === 'B').length,
                C: list.filter(b => b.class === 'C').length
            },
            bookings: list
        };
        return ok(res, summary, 'Ticket report generated');
    }

    // GET /api/reports/matches
    if (pathname === '/api/reports/matches' && method === 'GET') {
        const assigned = db.employees.filter(e => e.status === 'Assigned');
        return ok(res, { total: assigned.length, matches: assigned }, 'Matches report generated');
    }

    // GET /api/reports/inquiries
    if (pathname === '/api/reports/inquiries' && method === 'GET') {
        const list = db.inquiries;
        const summary = {
            total:   list.length,
            pending: list.filter(i => i.status === 'Pending').length,
            resolved:list.filter(i => i.status === 'Resolved').length,
            byType: {
                add:    list.filter(i => i.type === 'add').length,
                change: list.filter(i => i.type === 'change').length,
                delete: list.filter(i => i.type === 'delete').length
            },
            inquiries: list
        };
        return ok(res, summary, 'Inquiry report generated');
    }

    // GET /api/reports/capacity
    if (pathname === '/api/reports/capacity' && method === 'GET') {
        const cap = db.seatCapacity;
        const report = ['A', 'B', 'C'].map(cls => ({
            class:       cls,
            total:       cap[cls].total,
            booked:      cap[cls].booked,
            available:   cap[cls].total - cap[cls].booked,
            percentFull: Math.round((cap[cls].booked / cap[cls].total) * 100)
        }));
        return ok(res, report, 'Capacity report generated');
    }

    // ─────────────────────────────────────────────────
    // ADMIN AUTH
    // ─────────────────────────────────────────────────

    // POST /api/admin/login
    if (pathname === '/api/admin/login' && method === 'POST') {
        const err = validate(['username', 'password'], body);
        if (err) return badRequest(res, err);

        const ADMINS = [
            { username: 'admin',   password: 'admin123',   role: 'Super Admin' },
            { username: 'manager', password: 'manager123', role: 'Manager' }
        ];
        const u = (body.username || '').trim().toLowerCase();
        const p = (body.password || '').trim();
        const admin = ADMINS.find(a => a.username === u && a.password === p);
        if (!admin) return send(res, 401, { success: false, message: 'Invalid username or password' });

        return ok(res, { username: admin.username, role: admin.role, loginAt: new Date().toISOString() }, 'Login successful');
    }

    // ─────────────────────────────────────────────────
    // SUBSCRIBERS (GET for admin dashboard)
    // ─────────────────────────────────────────────────

    // GET /api/subscribers
    if (pathname === '/api/subscribers' && method === 'GET') {
        return ok(res, db.subscribers || [], `${(db.subscribers||[]).length} subscriber(s)`);
    }

    // ─────────────────────────────────────────────────
    // 404 fallthrough
    // ─────────────────────────────────────────────────
    notFound(res, `Route ${method} ${pathname} not found`);
}

// ─── START SERVER ─────────────────────────────────────────────────────────────

const server = http.createServer(async (req, res) => {
    try {
        await router(req, res);
    } catch (err) {
        console.error('Unhandled error:', err);
        send(res, 500, { success: false, message: 'Internal server error' });
    }
});

server.listen(PORT, () => {
    console.log('');
    console.log('  ✈  Kenya Airways Backend Server');
    console.log('  ─────────────────────────────────────────');
    console.log(`  🟢  Running at  http://localhost:${PORT}`);
    console.log(`  📁  Serving frontend from /public`);
    console.log(`  🗄  Database: db.json`);
    console.log('');
    console.log('  API Endpoints:');
    console.log('  GET    /api/bookings           — list bookings');
    console.log('  POST   /api/bookings           — add booking');
    console.log('  GET    /api/bookings/:id       — get booking');
    console.log('  PUT    /api/bookings/:id       — change booking');
    console.log('  DELETE /api/bookings/:id       — delete booking');
    console.log('  GET    /api/passengers         — list passengers');
    console.log('  POST   /api/passengers         — add passenger');
    console.log('  PUT    /api/passengers/:id     — edit passenger');
    console.log('  DELETE /api/passengers/:id     — delete passenger');
    console.log('  GET    /api/inquiries          — list inquiries');
    console.log('  POST   /api/inquiries          — submit inquiry');
    console.log('  PUT    /api/inquiries/:id      — update inquiry');
    console.log('  GET    /api/employees          — list assignments');
    console.log('  POST   /api/employees          — assign employee');
    console.log('  DELETE /api/employees/:id      — remove assignment');
    console.log('  GET    /api/capacity           — seat availability');
    console.log('  POST   /api/subscribe          — newsletter signup');
    console.log('  POST   /api/evaluate           — submit usability rating');
    console.log('  GET    /api/evaluate           — evaluation stats');
    console.log('  GET    /api/reports/tickets    — ticket report');
    console.log('  GET    /api/reports/matches    — matches report');
    console.log('  GET    /api/reports/inquiries  — inquiries report');
    console.log('  GET    /api/reports/capacity   — capacity report');
    console.log('');
});
