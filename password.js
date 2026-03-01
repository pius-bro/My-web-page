function generatePassword(length,includeLowercase,includeUppercase,includeNumbers,includeSymbols){
    const lowecaseChars ="abcderfghys";
    const uppercaseChars = "ABSCHGYTRYUJ";
    const numberChars="09878657436125";
    const symbolChars ="#$%^&**&^@!~|*+=-_";
    
    let allowedChars ="";
    let password = "";

    allowedChars += includeLowercase ? lowecaseChars:"";
    allowedChars += includeUppercase ? uppercaseChars:"";
    allowedChars += includeNumbers ? numberChars:"";
    allowedChars += includeSymbols ? symbolChars:"";
    if(length<=0){
        return '(length must be at least 1';

    }
    if(allowedChars.length ===0){
        return '(At least 1 set of character needs to be selected';
    }
     for(let i=0; i < length; 1++){
        const randomIndex = Math.floor(Math.random()*allowedChars.lenght);
        password += allowedChars[randomIndex];
     }

    console.log(allowedChars);
    return password;
}

const passwordLength = 12;
const includeLowercase = true;
const includeUppercase = true;
const includeNumbers = true;
const includeSymbols = true;
const password=generatePassword(
                                  includeLowercase,
                                  includeUppercase,
                                  includeNumbers,
                                  includeSymbols
                                );
console.log(`Generate pawword: ${password}`);

