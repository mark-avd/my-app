enum Languages {
    english = 'eng',
    russian = 'ru'
}

type sentenceObject = {
    [key in Languages]: string
}

export const mockSentences: sentenceObject[] = [
    {
        eng: 'Scaling to many files and components',
        ru: 'Масштабирование до большого количества файлов и компонентов'
    },
    {
        eng: 'You can upgrade to React18 with minimal or no changes to your application code',
        ru: 'Вы можете перейти на React18 с минимальными изменениями или вообще без изменений в коде вашего приложения'
    }
]
