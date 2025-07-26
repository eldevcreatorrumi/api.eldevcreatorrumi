let autoUpdateInterval = null;
let isAutoUpdating = false;

async function testAPI() {
    const button = document.querySelector('.test-button');
    const spinner = document.getElementById('spinner1');
    const status = document.getElementById('status1');
    const result = document.getElementById('result1');

    button.disabled = true;
    spinner.style.display = 'inline-block';
    status.textContent = 'Загрузка...';
    status.className = 'status loading';

    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        const timestamp = new Date().toLocaleString('ru-RU');
        result.textContent = `✅ Успешный запрос (${timestamp})\n\n📊 Ответ сервера:\n${JSON.stringify(data, null, 2)}`;
        
        status.textContent = 'Успех';
        status.className = 'status success';
        
        updateLastUpdate();
    } catch (error) {
        result.textContent = `❌ Ошибка запроса (${new Date().toLocaleString('ru-RU')})\n\n🔍 Детали ошибки:\n${error.message}`;
        
        status.textContent = 'Ошибка';
        status.className = 'status error';
    } finally {
        button.disabled = false;
        spinner.style.display = 'none';
    }
}

async function autoUpdate() {
    const status = document.getElementById('status2');
    const result = document.getElementById('result2');

    status.textContent = 'Обновление...';
    status.className = 'status loading';

    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        const timestamp = new Date().toLocaleString('ru-RU');
        result.textContent = `🔄 Автообновление (${timestamp})\n\n📊 Статус сервера:\n${JSON.stringify(data, null, 2)}`;
        
        status.textContent = 'Активно';
        status.className = 'status success';
        
        updateLastUpdate();
    } catch (error) {
        result.textContent = `❌ Ошибка автообновления (${new Date().toLocaleString('ru-RU')})\n\n🔍 Ошибка:\n${error.message}`;
        
        status.textContent = 'Ошибка';
        status.className = 'status error';
    }
}

function toggleAutoUpdate() {
    const button = document.getElementById('autoButton');
    const status = document.getElementById('status2');
    const result = document.getElementById('result2');

    if (isAutoUpdating) {
        clearInterval(autoUpdateInterval);
        autoUpdateInterval = null;
        isAutoUpdating = false;
        
        button.textContent = '▶️ Запустить автообновление';
        status.textContent = 'Остановлено';
        status.className = 'status';
        result.textContent = 'Автообновление остановлено...';
    } else {
        autoUpdateInterval = setInterval(autoUpdate, 30000);
        isAutoUpdating = true;
        
        button.textContent = '⏹️ Остановить автообновление';
        autoUpdate();
    }
}

function updateLastUpdate() {
    document.getElementById('lastUpdate').textContent = new Date().toLocaleString('ru-RU');
}

// Автоматический тест при загрузке страницы
window.addEventListener('load', () => {
    setTimeout(testAPI, 1000);
}); 