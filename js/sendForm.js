const sendForm = () => {
    const form = document.querySelector('.modal');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const sendObj = {};
        for (let [key, value] of formData.entries()) {
            sendObj[key] = value;
        }

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(sendObj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then((json) => {
                console.log('Успешный ответ:', json);
                alert('Данные успешно отправлены!');
            })
            .catch((error) => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз.');
            })
            .finally(() => {
                form.reset();
                console.log('Форма очищена');
            });
    });
}
sendForm()