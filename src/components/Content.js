import Item from './Item'

const Content = ({ rules, query }) => {
    return (
      <div className="m-4" id="content" data-bs-target="#sidebar-wrapper" > 
          { Object.entries(rules).length > 0 ? Object.entries(rules).map(([rule, text], i) => {
              return <Item key={i} header={rule} text={text} search={query}/>
            }) : query !== "" ? <span>Nothing was found with phrase <b>{query}</b></span> : <div className="spinner-border" role="status"> </div>
          }
      </div>
    )
  }

export default Content;
