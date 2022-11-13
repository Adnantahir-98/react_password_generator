import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CheckBox from './components/checkBox'


function App() {
     
    const [generatedPassword, setGeneratedPassword] = useState("")
    const [copied, setCopied] = useState(false)
    const [password, setPassword] = useState({
        length: 5,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false
    });


    const handleUppercase = () => {
        setPassword({
            ...password,
            uppercase: !password.uppercase,
        })
    }
    const handleLowercase = () => {
        setPassword({
            ...password,
            lowercase: !password.lowercase,
        })
    }
    const handleNumbers = () => {
        setPassword({
            ...password,
            numbers: !password.numbers,
        })
    }
    const handleSymbols = () => {
        setPassword({
            ...password,
            symbols: !password.symbols,
        })
    }
    const passwordLength = (val) => {
        setPassword({
            ...password,
            length: val
        })
    }

    const generatePassword = (e) => {
        const numbersArray = [0,1,2,3,4,5,6,7,8,9]
        const symbolsArray = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]","|",":",";","<",">",".","?","/"]

        const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97)
        const lowerCase = characterCodes.map(letter => String.fromCharCode(letter))
        const upperCase = lowerCase.map(letter => letter.toUpperCase())
        
        const {length, uppercase, lowercase, numbers, symbols} = password

        const generateThePwd = (length, uppercase, lowercase, numbers, symbols) => {
            const availableCharacters = [
                ...(uppercase ? upperCase : []),
                ...(lowercase ? lowerCase : []),
                ...(numbers ? numbersArray : []),
                ...(symbols ? symbolsArray : []),
            ]
            const shuffleArray = (array) => array.sort(() => Math.random() - 0.5)
            const characters = shuffleArray(availableCharacters).slice(0, length);
            setGeneratedPassword(characters.join(''))
            
            return characters;
        }
        generateThePwd(length, uppercase, lowercase, numbers, symbols)
    }

    return ( 
        <div>
            <Container>
                <Row>
                    <Col md={6} className='bg-light shadow m-auto mt-5 p-4 rounded'>
                    <h3> Password Generator </h3>
                    <div className='form-group d-flex my-3'>
                        <input type="text" value={generatedPassword} onChange={(e) => setGeneratedPassword(e.target.value)} className='form-control d-inline' />
                        <button 
                        onClick={() => {
                            if(generatedPassword.length > 0){
                                navigator.clipboard.writeText(generatedPassword)
                                setCopied(true)
                                setInterval(() => {
                                    setCopied(false)
                                }, 1500)
                            }
                        }} className={copied ? 'btn btn-outline-success' : 'btn btn-outline-primary'}> 
                            {copied ? 'Copied!' : 'Copy'}
                        </button> 
                    </div>
                    <div className='form-group d-flex mb-2'>
                        <lable htmlFor="PwdLength" className="mt-1"> Password Length: </lable> 
                        <input type="number" onChange={(e) => passwordLength(e.target.value)} value={password.length} id="PwdLength" max="65" className='form-control ms-auto w-25' />
                    </div> 
                    <div className="form-group d-flex">
                        <label htmlFor="Upletters"> Include uppercase letters: </label> 
                        <CheckBox value={password.uppercase} onChange={handleUppercase} />
                    </div> 
                    <div className="form-group d-flex">
                        <label htmlFor="Lowletters" className='me-auto'> Include lowercase letters: </label> 
                        <CheckBox value={password.lowercase} onChange={handleLowercase} id="Lowletters" />
                    </div> 
                    <div className="form-group d-flex">
                        <label htmlFor="Incnumbers"> Include numbers: </label> 
                        <CheckBox value={password.numbers} onChange={handleNumbers} id="Incnumbers" />
                    </div> 
                    <div className="form-group d-flex">
                        <label htmlFor="Incsymbols"> Include Symbols: </label> 
                        <CheckBox value={password.symbols} onChange={handleSymbols} id="Incsymbols" />
                    </div> 
                        <button type='submit' onClick={generatePassword} className='btn btn-primary my-2'> Generate Password </button> 
                    </Col> 
                </Row> 
            </Container>
        </div>
    );
}

export default App;
