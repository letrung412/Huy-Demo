// import * as xlsx from "sheetjs-style";
// import { Request, Response } from "express";

// function formatColumn(workSheet: xlsx.WorkSheet, range: xlsx.Range, style: object, format?: string) {
//     for (let C = range.s.c; C <= range.e.c; C++) {
//         for (let R = range.s.r; R <= range.e.r; R++) {
//             const cellref = xlsx.utils.encode_cell({ c: C, r: R });
//             if (workSheet[cellref]) {
//                 workSheet[cellref].s = style;
//                 if (workSheet[cellref].t == "n") {
//                     workSheet[cellref].z = format;
//                 }
//             }
//         }
//     }
// }