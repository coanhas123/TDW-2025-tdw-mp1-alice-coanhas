interface DateComponentProps {
    dateString: string;
}

export default function DateComponent({ dateString }: DateComponentProps) {
    // Tenta formatar a data para o formato português
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('pt-PT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <time dateTime={dateString}>
            {formattedDate}
        </time>
    );
}
