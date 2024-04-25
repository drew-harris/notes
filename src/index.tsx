import { BaseHtml } from './BaseHtml';

import { Hono } from 'hono';

const app = new Hono<{
	Bindings: {
		text: KVNamespace;
	};
}>();

app.get('/', async (c) => {
	const text = await c.env.text.get('bodyText');
	console.log('text', text);
	return c.html(
		<BaseHtml>
			<div class="border-black border-2 p-2 m-2 min-h-screen">
				<div
					dangerouslySetInnerHTML={{
						__html: text || '',
					}}
					class="min-h-screen border border-red-500"
					data-tiny-editor
				></div>
			</div>
		</BaseHtml>,
	);
});

app.get('/script', (c) => {
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

app.post('/upload', async (c) => {
	const bodyText = await c.req.text();

	c.env.text.put('bodyText', bodyText);

	return c.json({
		bodyText,
	});
});

export default {
	fetch: app.fetch,
};
