const fs = require("fs");
const DB_FILE_PATH = "./core/db";

function create(content) {
    // Precisa salvar o content no sistema
    fs.writeFileSync(DB_FILE_PATH, content)
    return content;
}

// [SIMULATION]
console.log(create("Hoje eu preciso assistir as aulas!"));