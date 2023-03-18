const UploadBar = ( {onSubmit} ) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(event.target.files[0])
    }
    return (
    <form class="flex items-center space-x-6">
        <div class="shrink-0">
            <img className="h-16 w-16 object-cover rounded-full" src="https://cdn.discordapp.com/avatars/122177431070179329/f87441cd490bc422dca578bfbf69da6f.webp?size=240" alt="Current profile photo" />
        </div>
        <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input type="file" className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100
            " onChange={handleSubmit}/>
        </label>
    </form>
    )
}

export default UploadBar