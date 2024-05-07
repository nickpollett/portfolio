
// dropdown selector without search
export default function Selector({ data, title, setValue, value }) {
    return (
        <>
            <label
                htmlFor="floating_status"
                className="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                {title}
            </label>
            <select
                value={value}
                className="select select-bordered w-48 mt-4"
                onChange={(e) => setValue(e.target.value)}
            >
                <option value="">{title}</option>

                {data?.map((item) => (
                    <option value={item.id} key={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </>
    );
}
