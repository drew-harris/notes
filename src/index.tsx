import { BaseHtml } from "./BaseHtml";

import { Hono } from "hono";

const app = new Hono<{
  Bindings: {
    text: KVNamespace;
  };
}>();

app.get("/", async (c) => {
  const text = await c.env.text.get("bodyText");
  console.log("text", text);
  return c.html(
    <BaseHtml solo={false}>
      <div class="p-3">
        <div>You are in PUBLIC mode.</div>
        <a class="mb-8 underline" href="/solo">
          Go Solo
        </a>
        <div class="p-2 min-h-screen">
          <div
            dangerouslySetInnerHTML={{
              __html: text || "",
            }}
            class="min-h-screen border border-red-500"
            data-tiny-editor
          ></div>
        </div>
      </div>
    </BaseHtml>,
  );
});

app.get("/solo", async (c) => {
  return c.html(
    <BaseHtml solo={true}>
      <div class="p-3">
        <div>You are in SOLO mode.</div>
        <a class="mb-8 underline" href="/">
          Go Public
        </a>
        <div class="p-2 min-h-screen">
          <div
            class="min-h-screen border border-red-500"
            data-tiny-editor
          ></div>
        </div>
      </div>
    </BaseHtml>,
  );
});

app.get("/script", (c) => {
  return c.text(`
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

const upload = (e) => {
console.log(e.target.innerHTML);

fetch("/upload", {
method: "POST",
	body: e.target.innerHTML,
})

}

const debouncedUpload = debounce(upload, 200);

	document
		.querySelectorAll('[data-tiny-editor]')
		.forEach(editor =>
			editor.addEventListener('input', debouncedUpload)
		)
	`);
});

app.get("/script/solo", async (c) => {
  return c.text(`
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

const localUpload = (e) => {
console.log(e.target.innerHTML);

window.localStorage.setItem("bodyText", e.target.innerHTML);

}

const debouncedUpload = debounce(localUpload, 200);

	document
		.querySelectorAll('[data-tiny-editor]')
		.forEach(editor =>
			editor.addEventListener('input', debouncedUpload)
		)

  //load the local storage
  const bodyText = window.localStorage.getItem("bodyText");

if (bodyText === null) {

  document.querySelector('[data-tiny-editor]').innerHTML = "This is solo mode. Changes are only made locally and are 100% private"

} else {

  document.querySelector('[data-tiny-editor]').innerHTML = bodyText;
}


`);
});

app.post("/upload", async (c) => {
  const bodyText = await c.req.text();

  await c.env.text.put("bodyText", bodyText);

  return c.json({
    bodyText,
  });
});

export default {
  fetch: app.fetch,
};
