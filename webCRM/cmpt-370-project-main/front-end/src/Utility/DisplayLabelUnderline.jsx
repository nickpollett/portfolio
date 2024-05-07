
// This component is used to display a floating label and a value with an underline
export default function DisplayUnderline({ value, title }) {
    return (
        <div className="relative z-0 w-full mb-6 group">
            <div
                type="text"
                name="Address"
                id="floating_address"
                className="block w-48 py-2.5 px-0 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
                {value || ""}
            </div>
            <label
                htmlFor="floating_address"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                {title}
            </label>
        </div>
    );
}
