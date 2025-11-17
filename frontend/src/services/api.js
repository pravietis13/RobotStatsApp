export const apiService = {
    // Получение общей статистики
    async getStats() {
        const response = await fetch('/api/stats');
        if (!response.ok) {
            throw new Error('Ошибка загрузки статистики');
        }
        return response.json();
    },

    // Получение списка запусков
    async getRuns() {
        const response = await fetch('/api/stats/runs');
        if (!response.ok) {
            throw new Error('Ошибка загрузки запусков');
        }
        return response.json();
    },
};