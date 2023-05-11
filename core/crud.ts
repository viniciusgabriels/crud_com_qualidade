import fs from "fs"; // ES6
// const fs = require("fs"); - Como js importa
const DB_FILE_PATH = "./core/db";

function create(content: string) {
    // Precisa salvar o content no sistema
    fs.writeFileSync(DB_FILE_PATH, content)
    return content;
}

// [SIMULATION]
console.log(create("Hoje eu preciso assistir as aulas!!"));