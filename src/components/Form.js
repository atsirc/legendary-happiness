import { useState } from 'react'
import { IoClose } from 'react-icons/io5'

const Form = ({onSubmit, label, icon, placeholder}) => {
    const [visibility, setVisibility] = useState('hidden')
    const [input, setInput] = useState('')
    const id = label.replace(' ','') + '-field'

    const handleSubmission = (ev) => {
        ev.preventDefault();
        onSubmit(input)
        setInput('')
    }

    const handleChange = (ev) => {
        ev.preventDefault();
        setInput(ev.target.value)
    }

    const remove = (ev) => {
        const parent = ev.currentTarget.parentElement
        const children = parent.childNodes
        children.forEach(n => {
            if (!n.classList.contains('submit')) {
                n.classList.add('hidden') 
            }
        })
        setVisibility('hidden')
        setInput('')
        onSubmit('')
    }
    const showInput = (ev) => {
        const parent = ev.currentTarget.parentElement
        const children = parent.childNodes
        children.forEach(n => {
            if (n.classList.contains('hidden')) {
                n.classList.remove('hidden')
            }
        })
        setVisibility('')
    }

    return (
        <form onSubmit={handleSubmission}>
             <div className="input-wrapper" id={id}>
                 <input  className={`input ${visibility}`} value={input} onChange={handleChange} type="search" placeholder={placeholder}/>
                 <button className="submit" type="submit" onClick={visibility === 'hidden' ? showInput : handleSubmission}> {icon} </button>
                 <button className={`close ${visibility}`} onClick={remove}> <IoClose/>  </button>
             </div>
        </form>
    )
}

export default Form
