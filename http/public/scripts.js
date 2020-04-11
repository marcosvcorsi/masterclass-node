const ul = document.querySelector('ul');
const input = document.querySelector('input');
const form = document.querySelector('form');

async function load() {
  const res = await fetch('http://localhost:3333/').then((data) => data.json());

  res.urls.forEach((url) => addElement(url));
}

async function send(param) {
  const { name, url, del } = param;

  let queryParam = `?name=${name}&url=${url}`;

  if (del) {
    queryParam = `${queryParam}&del=${del}`;
  }

  await fetch(`http://localhost:3333/${queryParam}`);
}

load();

function addElement({ name, url }) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const trash = document.createElement('span');

  a.href = url;
  a.innerHTML = name;
  a.target = '_blank';

  trash.innerHTML = 'x';
  trash.onclick = () => removeElement(trash);

  li.append(a);
  li.append(trash);
  ul.append(li);
}

function removeElement(el) {
  if (confirm('Tem certeza que deseja deletar?')) {
    const li = el.parentNode;

    const [a] = li.children;

    const name = a.text;
    const url = a.href.substring(0, a.href.length - 1);

    const param = {
      name,
      url,
      del: 1,
    };

    el.parentNode.remove();
    send(param);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let { value } = input;

  if (!value) return alert('Preencha o campo');

  const [name, url] = value.split(',');

  if (!url) return alert('formate o texto da maneira correta');

  if (!/^http/.test(url)) return alert('Digite a url da maneira correta');

  addElement({ name, url });
  send({ name, url });

  input.value = '';
});
