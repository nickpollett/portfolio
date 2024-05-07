// put admin items in accordion
export default function AccordionItem({ value, title }) {
    return (
        <>
            <div className="collapse collapse-arrow bg-base-300 border-2">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    {title}
                </div>
                <div className="collapse-content">{value}</div>
            </div>
        </>
    );
}
