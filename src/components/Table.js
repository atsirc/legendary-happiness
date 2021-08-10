const Table = ({ rules }) => {
   const createTree = (list) => {
      let currentHead = ""
      const tree = {}
      for (let i = 0; i < list.length; i++) {
         const chapter = list[i]
         if (!currentHead || chapter.charAt(0) !== currentHead.charAt(0)) {
            if (/^\d{1,2}\.$/.test(chapter)) {
               currentHead = chapter
               tree[currentHead] = []
            }
         } else if (/^\d{3,}\.$/.test(chapter)){
            tree[currentHead] = tree[currentHead].concat(chapter)
         }
      }
      return tree
   }

   const chapters = createTree(Object.keys(rules))
   const createTable = () => {
      return (
         <div id="table-container">
            <ul className="list-group list-group-flush">
            { Object.entries(chapters).map(([chapter, subchapters]) => {
               const childId = "child-" + chapter.replace('.', '')
               return (
                  <li key={chapter} className="list-group-item">
                     <button className="btn collapsed" data-bs-toggle="collapse" data-bs-target={"#" + childId} aria-expanded="false">
                        <b> {chapter} </b> {rules[chapter]}
                     </button>
                     <div className="collapse" id={childId}>
                        <ul className="list-group list-group-flush ms-2">
                        { subchapters.map( chapter => {
                           const href = '#rule-' + chapter
                           return <li key={chapter} className="ms-4"><a href={href}> {chapter} {rules[chapter]}</a></li>
                        })}
                        </ul>
                     </div>
                  </li>
               )
            })}
            </ul>
         </div>
      )
   }

   return (
      Object.keys(rules).length > 0 ? createTable() : <></>
   )
}

export default Table
