/* eslint-disable no-unused-vars */
import fallback from './magic-the-gathering.txt'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'
import Form from './components/Form'
import Table from './components/Table'
import {IoSearch} from 'react-icons/io5'
import {HiMenuAlt3} from 'react-icons/hi'

const App = () => {
   const [rules, setRules] = useState({})
   const [query, setQuery] = useState('')
   const [url, setUrl] = useState('https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt')

   const setupRules= (text) => {
      text = text.replace(/\r/g, '')
      text = text.replace(/\n([ ]*\n+)+/g, '\n\n')
      const contents = text.match(/(?<=Credits).*?(?=Glossary)/s)[0].split('\n\n')
      const rules = {}
      contents.forEach(line => {
         const parts = line.split(' ')
         const rule = parts.shift()
         rules[rule] = parts.join(' ')
         })
      delete rules['']
      setRules(rules)
   }

   const getText = () => {
      axios.post('http://localhost/php/get_page.php', {'url': url} )
      .then(response => {
            return response.data.result
      }).then(text => {
         setupRules(text)
      })
      .catch(error => {
         fetch(fallback)
         .then(response => response.text())
         .then(text => setupRules(text))
      })
   }
   useEffect(getText, [url])
   useEffect(()=>{
      document.getElementById('page-content-wrapper').scrollTo(0,0)
   }, [query])

   const filterRules = () => {
      if (query) {
         const results = {}
         const regex = new RegExp(query,'i')
         for (let [key, value] of Object.entries(rules)) {
            if (regex.test(value)) {
               results[key] = value
            }
         }
         return results
      }
      return rules
   }

   const addQuery = (string) => {
      const cleanedSearch = string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      setQuery(cleanedSearch)
   }
 
   return (
      <div className="d-flex" id="wrapper">
         <nav className="navbar navbar-expand-md fixed-left">
            <a className="navbar-brand" href="">Magic the Gathering</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"><HiMenuAlt3/></span>
             </button>
            <div className="collapse navbar-collapse" id="sidebar"> 
               <Form onSubmit={addQuery} label={'search'} icon={<IoSearch/>} placeholder={''}/>
               {query ? <></>:<Table rules={rules} />}
            </div>
         </nav>
         <div id="page-content-wrapper" className="overflow-auto">
            <Content rules={filterRules()} query={query}/>
         </div>
      </div>
   )
}

export default App;
