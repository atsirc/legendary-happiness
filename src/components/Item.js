const Item = ({header, text, search}) => {
    const id = 'rule-' + header
    const type = {
        h1:/^\d\.$/,
        h2:/^\d{3,}\.$/,
        rule:/^[0-9\.]*$/,
        subrule: ''
    }
    const elements = {
        link: {
            regex: function() {
                return new RegExp(/\d{3}\.?\d*([a-z]+|\.{1})?/,'g')
            },
            addEl: function(href, text) {
                return <a href={href}>{text}</a>
            }
        },
        highlight: {
            regex: function(search){
                return new RegExp(search, 'gi')
            },
            addEl: function(text){
                return <span className='highlight'>{text}</span>
            }
        }
    }
    const formatText = (text) => {
        const obj = search ? 'highlight' : 'link'
        return (
             <> {
                text.replace(elements[obj].regex(search), function (match) {
                    return `<${match}>`
                }).split(/(<.*?>)/).map(string => {
                    if ((/<.*?>/).test(string)) {
                        const match = string.replace(/[<>]/g, '')
                        switch (obj) {
                        case 'link':
                            const link = /[\d]/.test(match.slice(-1)) ? match + '.' : match
                            const href = '#rule-' + link
                            return elements[obj].addEl(href, match)
                        case 'highlight':
                            return elements[obj].addEl(match)
                        }
                    } else {
                        return string
                    }
                })
           } </>
        )
    }

    if (type.h1.test(header))
        return <h1 key={id} id={id}>{header} {formatText(text)}</h1>
    if (type.h2.test(header))
        return <h2 key={id} id={id} className='ms-1'>{header} {formatText(text)}</h2>
    if (type.rule.test(header))
        return <p key={id} id={id} className='ms-2'><b>{header}</b> {formatText(text)}</p>
    else
        return <p key={id} id={id} className='ms-5'>{header} {formatText(text)}</p>
}
export default Item
