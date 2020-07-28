const fields = [
    { id: 'author', text: 'Автор' },
    { id: 'title', text: 'Название' },
    { id: 'weight', text: 'Вес в упаковке' },
    { id: 'size', text: 'Размер (ДхШхВ)' },
    { id: 'formatEdition', text: 'Формат издания' },
    { id: 'ISBN', text: 'ISBN' },
    { id: 'vendorCode', text: 'Артикул' },
    { id: 'numberOfPages', text: 'Количество страниц' },
    { id: 'coverType', text: 'Тип обложки' },
    { id: 'paperType', text: 'Тип бумаги' },
    { id: 'authorOnTheCover', text: 'Автор на обложке' },
    { id: 'publishingHouse', text: 'Издательство' },
    { id: 'yearOfIssue', text: 'Год выпуска' },
    { id: 'language', text: 'Язык издания' },
    { id: 'series', text: 'Серия' },
    { id: 'description', text: 'Описание' },
];

const settings = () => {
    return fields.map((field, index) => {
        return {
            ...field,
            index: index + 1,
            isPublic: true,
            isShowInTable: false,
            isFilterable: false,
        }
    })
};

export const DEFAULT_SETTINGS = settings();

export const INPUT_TYPE_NUMBER = ['weight', 'numberOfPages', 'yearOfIssue'];