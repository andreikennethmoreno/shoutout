export default function Input({type, name, value, onChange, placeholder}) {
    return (
        <>
            <div className="form-control">
                <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className="rounded input input-bordered" required />
            </div>
        </>
    )
}