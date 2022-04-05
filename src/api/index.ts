const mockData: [] = require('@/api/mock')
const fetchUrl = 'https://my.api.mockaroo.com/bell_test_vue.json?key=0fcf2830'

export default {
    async fetchItems(): Promise<any> {
        const response = await fetch(fetchUrl)
        if (!response.ok) {
            console.error('Не удалось загрузить данные с сервера')
            return mockData
        }
        return response.json()
    }
}