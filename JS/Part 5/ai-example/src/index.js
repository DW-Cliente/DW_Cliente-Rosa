const input = document.getElementById("input");
const output = document.getElementById("traducido");
const resumido = document.getElementById("resumido");
const lang = document.getElementById("lang");
const button = document.getElementById("button");
const btnResume = document.getElementById("btn-resume");


async function detectLanguage(text) {
   const detector = await LanguageDetector.create({
    expectedInputLanguages: ["en", "es", "de", "fr"],
  });
  const results = await detector?.detect(text);
  return results[0]?.detectedLanguage ?? 'en';
}

async function translate(text, input, output) {
  const translator = await Translator.create({
    sourceLanguage: input,
    targetLanguage: output,
  });
  return await translator.translate(text);
}

button.addEventListener("click", async () => {
  button.disabled = true;
  try {
    const text = input.value;
    const inputLang = await detectLanguage(text);
    const outputLang = lang.value;
    output.value = await translate(text, inputLang, outputLang);
  } catch (error) {
    output.value = error.toString();
  } finally {
    button.disabled = false;
  }
});

async function summarize(text) {
  const summarizer = await Summarizer.create({
    sharedContext:
      "A general summary to help a user decide if the text is worth reading",
    type: "tldr",
    length: "short",
    format: "plain-text",
    expectedInputLanguages: ["en", "es"],
    outputLanguage: "es",
  });

  return await summarizer.summarize(text);
}

btnResume.addEventListener("click", async () => {
  resumido.disabled = true;
  try {
    const text = input.value;
    resumido.value = await summarize(text, lang.value);
  } catch (error) {
    resumido.value = error.toString();
  } finally {
    resumido.disabled = false;
  }
});