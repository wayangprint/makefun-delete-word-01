// The dictionary has one word too many, and this program files the complaint.
// Twelve letters of pure redundancy walk into the court of public usage;
// the verdict is a single file holding a single word, nothing else attached.
// No preamble, no apology — the word speaks for itself, then leaves the language.

import * as fs from "node:fs";
import * as path from "node:path";

// The accused: a word that never belonged in the dictionary to begin with.
const BANISHED = "irregardless";

// The courtroom: MAKEFUN_OUTPUT_DIR when the harness sets one, /output otherwise.
const VERDICT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The charge sheet: the entry must be exactly one word, no spaces, no newlines.
function confirmSingleWord(candidate: string): void {
  if (candidate.length === 0 || /\s/.test(candidate)) {
    throw new Error("entry must be exactly one word");
  }
}

// Hand down the verdict: create the folder if needed and file the word away.
function inscribeEntry(): string {
  const destination = path.join(VERDICT_DIR, "entry.txt");
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, BANISHED, "utf8");
  return destination;
}

confirmSingleWord(BANISHED);
const filedAt = inscribeEntry();

// Double-check the record: what was filed must match the accused, byte for byte.
function verifyFiledWord(filedPath: string, expected: string): void {
  const filed = fs.readFileSync(filedPath, "utf8");
  if (filed !== expected || Buffer.byteLength(filed, "utf8") !== expected.length) {
    throw new Error("filed word does not match the accused");
  }
}

verifyFiledWord(filedAt, BANISHED);
process.stdout.write(fs.readFileSync(filedAt, "utf8") + "\n");
