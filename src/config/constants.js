const fields = [
    { settingId: 'author', text: 'Автор' },
    { settingId: 'title', text: 'Название' },
    { settingId: 'weight', text: 'Вес в упаковке' },
    { settingId: 'size', text: 'Размер (ДхШхВ)' },
    { settingId: 'formatEdition', text: 'Формат издания' },
    { settingId: 'ISBN', text: 'ISBN' },
    { settingId: 'vendorCode', text: 'Артикул' },
    { settingId: 'numberOfPages', text: 'Количество страниц' },
    { settingId: 'coverType', text: 'Тип обложки' },
    { settingId: 'paperType', text: 'Тип бумаги' },
    { settingId: 'authorOnTheCover', text: 'Автор на обложке' },
    { settingId: 'publishingHouse', text: 'Издательство' },
    { settingId: 'yearOfIssue', text: 'Год выпуска' },
    { settingId: 'language', text: 'Язык издания' },
    { settingId: 'series', text: 'Серия' },
    { settingId: 'description', text: 'Описание' },
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

export const searchInputTypeNumber = ['weight', 'numberOfPages', 'yearOfIssue'];