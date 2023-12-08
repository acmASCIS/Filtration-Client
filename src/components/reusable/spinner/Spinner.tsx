const Spinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center">
            <svg className="animate-spin -ml-1 mr-3 h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25 light-blue-stroke" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                <path className="opacity-75" fill="blue" d="M4 12a8 8 0 0116 0H4z"></path>
            </svg>
        </div>
    );
};

export default Spinner;
