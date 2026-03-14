import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import * as readline from "readline";

const args = process.argv.slice(2);
const flags: Record<string, string> = {};
let title = "";

// Parse flags and positional args
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--category" && args[i + 1]) {
    flags.category = args[++i];
  } else if (args[i] === "--sub" && args[i + 1]) {
    flags.subcategory = args[++i];
  } else if (!title) {
    title = args[i];
  }
}

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  if (!title) {
    title = await prompt("Article title: ");
    if (!title) {
      console.error("Title is required.");
      process.exit(1);
    }
  }

  let category = flags.category;
  if (!category) {
    category = await prompt("Category (football / cricket / analysis) [football]: ");
    category = category || "football";
  }

  let subcategory = flags.subcategory;
  if (!subcategory) {
    const defaultSub =
      category === "football"
        ? "Premier League"
        : category === "cricket"
          ? "Test"
          : "";
    subcategory = await prompt(`Subcategory [${defaultSub}]: `);
    subcategory = subcategory || defaultSub;
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const today = new Date().toISOString().split("T")[0];
  const filename = `${slug}.mdx`;
  const filepath = path.join(process.cwd(), "content/articles", filename);

  if (fs.existsSync(filepath)) {
    console.error(`File already exists: ${filepath}`);
    process.exit(1);
  }

  const template = `---
title: "${title}"
date: "${today}"
category: "${category}"
subcategory: "${subcategory}"
excerpt: "Add a brief excerpt here."
featured: false
tags: []
author: "William Powell"
---

## Introduction

Set the scene here — what happened, why it matters.

## Key Moments

Describe the pivotal moments of the match or story.

## Tactical Notes

What stood out tactically? Formation, pressing, set pieces.

## Looking Ahead

What does this result mean going forward?
`;

  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, template);
  console.log(`\nCreated: content/articles/${filename}\n`);

  // Try to open in default editor
  try {
    const platform = process.platform;
    if (platform === "darwin") {
      execSync(`open "${filepath}"`);
    } else if (platform === "linux") {
      execSync(`xdg-open "${filepath}"`);
    } else if (platform === "win32") {
      execSync(`start "" "${filepath}"`);
    }
    console.log("Opened in your default editor.\n");
  } catch {
    console.log(`Open the file manually: ${filepath}\n`);
  }

  console.log("Next steps:");
  console.log("  1. Edit the article");
  console.log('  2. git add . && git commit -m "New article" && git push');
  console.log("  3. Live on cuvasports.com in ~60 seconds\n");
}

main();
