export const formatDate = (value: string) => {
    if(!value) return ""
    const date = new Date(value);
    if(!date) return ""

    const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + "" + month;
};

