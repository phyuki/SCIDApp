import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  BackHandler,
  Modal,
  Image,
  TouchableHighlight
} from 'react-native';
import { RadioButton } from 'react-native-paper'
import RadioButtonHorizontal from '../radiobutton';
import config from '../config/config.json'
import RadioButton3Items from '../radiobutton3Items';

export default function TEI({route, navigation}){

    const { user, patient, questions } = route.params
    
    const [checked, setChecked] = useState([])
    const [questionInd, setQuestionInd] = useState(0)
    const [sectionInd, setSectionInd] = useState(0)
    const [sectionScores, setSectionScores] = useState([])
    const [input, setInput] = useState()
    const [saved, setSaved] = useState(false)
    const [finish, setFinish] = useState(false)
    const [lifetime, setLifetime] = useState()
    const [past, setPast] = useState()
    const [inputFocused, setInputFocused] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const qtdQuestions = [3, 3, 1, 1, 3, 3, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1]

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
          setKeyboardVisible(true);
        });
    
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
          setKeyboardVisible(false);
        });
    
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);

    const textQuestion = (index) => {
        return questions[index][1]+" - "+questions[index][2]
    }

    function questionsK1(){
        return(
            <>
            <View style={styles.containerQuestion}>
                    <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                    <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
                        setChecked={setChecked}/>
            </View>
            <View style={styles.containerQuestion}>
                    <Text style={styles.textQuestion}>{textQuestion(questionInd+1)}</Text>
                    <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd+1} 
                        setChecked={setChecked}/>
            </View>
            <View style={styles.containerQuestion}>
                    <Text style={styles.textQuestion}>{textQuestion(questionInd+2)}</Text>
                    <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd+2} 
                        setChecked={setChecked}/>
            </View>
            </>
    )}

    function questionsKTEIB(){
        return(<>
            <View style={styles.containerQuestion}>
                    <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                    <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
                        setChecked={setChecked}/>
            </View>
            <View style={styles.containerQuestion}>
                    <Text style={styles.textQuestion}>{textQuestion(questionInd+1)}</Text>
                    <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd+1} 
                        setChecked={setChecked}/>
            </View>
            <View style={styles.containerQuestion}>
                    <Text style={styles.textQuestion}>{textQuestion(questionInd+2)}</Text>
                    <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd+2} 
                        setChecked={setChecked}/>
            </View>
            </>
        )
    }

    function questionKTEIB5(){
        return(<>
            <View style={styles.containerQuestion}>
                    <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                    <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
                        setChecked={setChecked}/>
            </View>
            <View style={styles.containerQuestion}>
                    <Text style={styles.textQuestion}>{textQuestion(questionInd+1)}</Text>
                    <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd+1} 
                        setChecked={setChecked}/>
            </View>
            {checked[questionInd+1] == '3' && 
            <View style={styles.containerQuestion}>
                    <Text style={styles.textQuestion}>{textQuestion(questionInd+2)}</Text>
                    <TextInput style={styles.input}
                        onChangeText={value => {
                            setChecked(() => {
                            const newArr = checked.concat()
                            newArr[questionInd+2] = value
                            return newArr
                        })}}
                        value={checked[questionInd+2]}
                        placeholder=''
                        placeholderTextColor='grey'
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        onEndEditing={() => setInputFocused(false)}/>
            </View>}
            </>        
        )
    }

    function questionsK3_1(disorders, visible){
            return(<>
            {visible && <View style={styles.containerQuestion}>
                <Text style={{color: '#000', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginVertical: 10, textAlign: 'justify'}}>
                As explosões aconteceram somente...</Text>
            </View>}
                <View style={styles.containerQuestion}>
                        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                        <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
                            setChecked={setChecked}/>
                        <Text style={styles.textObs}>{'Obs.: Sim = Atenção para '+disorders[0]}</Text>
                </View>
                <View style={styles.containerQuestion}>
                        <Text style={styles.textQuestion}>{textQuestion(questionInd+1)}</Text>
                        <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd+1} 
                            setChecked={setChecked}/>
                        <Text style={styles.textObs}>{'Obs.: Sim = Atenção para '+disorders[1]}</Text>
                </View>
            </>)
    }

    function showQuestion(){
        switch(questionInd+1){
            case 1:
                return (<><View style={{marginTop: 20}}>{questionsK1()}</View></>)
            case 4:
                return (
                    <>
                        <View style={styles.containerQuestion}>
                                <Text style={{color: '#000', fontSize: 17, fontWeight: 'bold', marginHorizontal: 20, marginVertical: 10, textAlign: 'justify'}}>
                                    Você já perdeu o controle ao ponto de...</Text>
                        </View>
                        {questionsK1()}
                    </>)
            case 7:
                return (<>
                    <View style={styles.containerQuestion}>
                        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                        <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
                           options={['Não', 'Talvez', 'Sim']} checked={checked} setChecked={setChecked}/>
                    </View>
                </>)
            case 8:
                return (<>
                    <View style={styles.containerQuestion}>
                        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                        <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
                           options={['Não', 'Talvez', 'Sim']} checked={checked} setChecked={setChecked}/>
                        <Text style={[styles.textObs, {marginBottom: 0}]}>Observações</Text>
                        <Text style={styles.textObs}>Não = Ações agressivas planejadas ou sob controle do paciente</Text>
                        <Text style={[styles.textObs, {marginTop: 0}]}>Sim = Ações agressivas sem controle</Text>
                    </View>
                </>)
            case 9:
                return (<View style={{flex: 1, marginTop: 10}}>{questionsKTEIB()}</View>)
            case 12:
                return(<View style={{marginTop: 20}}>{questionKTEIB5()}</View>)
            case 15:
                return (<>
                    <View style={styles.containerQuestion}>
                        <Text style={styles.textObs}>Averiguação com o paciente</Text>
                        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                        <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
                            setChecked={setChecked}/>
                    </View>
                </>)
            case 16:
                return(<>
                    {questionsK3_1(['Depressão recorrente','Mania ou Hipomania'], true)}
                </>)
            case 18:
                return(<>
                    {questionsK3_1(['Transtorno Disruptivo da Desregulação do Humor','Síndrome psicótica'], true)}
                </>)
            case 20:
                return(<>
                    {questionsK3_1(['Trauma craniano','Síndrome demencial'], true)}
                </>)
            case 22:
                return(<>
                    {questionsK3_1(['Intoxicação exógena','Transtornos de adaptação'], true)}
                </>)
            case 24:
                return(<>
                    {questionsK3_1(['Transtorno antissocial de personalidade','Transtorno borderline de personalidade'], false)}
                </>)
            case 26:
                return(<>
                <View style={styles.containerQuestion}>
                    <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                    <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
                            setChecked={setChecked}/>
                </View></>)
            case 27:
                return(<>
                    <View style={styles.containerQuestion}>
                    <Text style={[styles.textObs, {marginBottom: 0}]}>Observação: Não deve ser lida para o paciente</Text>
                        <Text style={{color: 'black', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                            <RadioButton3Items direction={'row'} color={'black'} questionInd={questionInd} 
                                options={['Leve', 'Moderado', 'Grave']} checked={checked} setChecked={setChecked}/>
                            
                            <Text style={[styles.textObs, {marginBottom: 0}]}>
                            Leve = Poucos (se alguns) sintomas excedendo aqueles necessários para o diagnóstico presente, e os sintomas resultam em não mais do que um 
                            comprometimento menor seja social ou no desempenho ocupacional.</Text>
                            <Text style={[styles.textObs, {marginBottom: 0}]}>
                            Moderado = Sintomas ou comprometimento funcional entre “leve” e “grave” estão presentes.</Text>
                            <Text style={styles.textObs}>
                            Grave = Vários sintomas excedendo aqueles necessários para o diagnóstico, ou vários sintomas particularmente graves estão presentes, 
                            ou os sintomas resultam em comprometimento social ou ocupacional notável.</Text>
                    </View></>)
            case 28:
                return(<>
                    <View style={styles.containerQuestion}>
                        <Text style={styles.textObs}>Observação: Não deve ser lida para o paciente</Text>
                        <Text style={{color: 'black', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                            <View style={{marginTop: -10}}/>
                            <RadioButton3Items direction={'column'} color={'black'} questionInd={questionInd} 
                                options={['Em remissão parcial', 'Em remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
                            <View style={{marginBottom: 10}}/>
                    </View>
                    </>)
            case 29:
                return(<>
                    <View style={styles.containerQuestion}>
                        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                        <TextInput style={styles.input}
                        onChangeText={value => {
                            setChecked(() => {
                            const newArr = checked.concat()
                            newArr[questionInd] = value
                            return newArr
                        })}}
                        value={checked[questionInd]}
                        placeholder='Tempo em meses'
                        placeholderTextColor='grey'/>
                    </View></>)
            case 30:
                return(<>
                    <View style={styles.containerQuestion}>
                        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                        <TextInput style={styles.input}
                        onChangeText={value => {
                            setChecked(() => {
                            const newArr = checked.concat()
                            newArr[questionInd] = value
                            return newArr
                        })}}
                        value={checked[questionInd]}
                        placeholder='Tempo em anos'
                        placeholderTextColor='grey'/>
                        <Text style={styles.textObs}>Observação: codificar 99 se desconhecida</Text>
                    </View></>)
            default:
                console.log("Error")
        }
    }

    async function registerDiagnosis(lifetime, past) {

        let reqs = await fetch(config.urlRootNode+'reports', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lifetime: lifetime,
                past: past,
                disorder: 'TEI',
                patientId: patient
            })
        })
        let resp = await reqs.json()
        return resp
    }

    async function registerCriteria() {

        const criteria = ['K1', 'K2', 'K-TEI-A', 'K-TEI-B', 'K-TEI-C', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9']

        let reqs = await fetch(config.urlRootNode+'details', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                criteria: criteria,
                score: sectionScores,
                disorder: 'TEI',
                patientId: patient
            })
        })
        let resp = await reqs.json()
        return resp
    }

    async function registerAnswers() {
  
        let questionId = questions.map((array) => array[0]); 
        
        let reqs = await fetch(config.urlRootNode+'answers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              disorder: 'TEI',
              answers: checked,
              patientId: patient,
              questionId: questionId
            })
        })
        let resp = await reqs.json()
        return resp
      }

    async function saveDiagnosis(lifetime, past){
        const details = await registerCriteria()
        const answers = await registerAnswers()
        registerDiagnosis(lifetime, past).then(
            navigation.navigate('ShowPartial', {user: user, patient: patient, 
                lifetime: lifetime, past: past, disorderPrev: 'Transtorno Explosivo Intermitente', disorderNext: 'Clepto'}))
    }

    async function saveAnswers(){
        const details = await registerCriteria()
        registerAnswers().then(result =>
            navigation.navigate('ShowPartial', {user: user, patient: patient, 
                lifetime: lifetime, past: past, disorderPrev: 'Transtorno Explosivo Intermitente', disorderNext: 'Clepto'}))
      }

    const plusQuestion = () => {
        let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
        let nextSection = questionInd + qtdQuestions[sectionInd]
        let nextToK7 = false, nextToK8 = false, nextToK9 = false
        let goToClepto = false
        console.log('ID: '+questionInd)
        console.log('Next: '+nextSection)
        console.log(questions)

        for(let i=questionInd; i<nextSection; i++) success = success && checked[i]

        if(questionInd == 11) 
            if(checked[12] == '1' || (checked[12] == '3' && checked[questionInd+2])) success = true
            
        if(success){

            if(questionInd == 3){
                if(checked[2] == '1' && checked[5] == '1') {
                    setSectionScores(() => {
                        const newArr = sectionScores.concat()
                        newArr[0] = '1'
                        return newArr
                    })
                    goToClepto = true
                }
                else{
                    setSectionScores(() => {
                        const newArr = sectionScores.concat()
                        newArr[0] = '3'
                        return newArr
                    })
            }}

            if(questionInd == 6){
                if(checked[6] == '1') goToClepto = true
                setSectionScores(() => {
                    const newArr = sectionScores.concat()
                    newArr[1] = checked[6]
                    return newArr
                })
            }

            if(questionInd == 7){
                if(checked[7] == '1') goToClepto = true
                setSectionScores(() => {
                    const newArr = sectionScores.concat()
                    newArr[2] = checked[7]
                    return newArr
                })
            }

            if(questionInd == 11){
                setInput('')
                if(checked[8] == '1' && checked[9] == '1' && checked[10] == '1' && 
                    checked[11] == '1' && checked[12] == '1') {
                        setSectionScores(() => {
                            const newArr = sectionScores.concat()
                            newArr[3] = '1'
                            return newArr
                        })
                        goToClepto = true
                }
                else{
                    setSectionScores(() => {
                        const newArr = sectionScores.concat()
                        newArr[3] = '3'
                        return newArr
                    })
            }}

            if(questionInd == 14){
                setSectionScores(() => {
                    const newArr = sectionScores.concat()
                    newArr[4] = checked[14]
                    return newArr
                })
                if(checked[14] == '1') goToClepto = true
            }

            if(questionInd == 15 || questionInd == 17 || questionInd == 19 || questionInd == 21){
                if(checked[questionInd] == '3' || checked[questionInd+1] == '3') {
                    setSaved(true)
                    setSectionScores(() => {
                        const newArr = sectionScores.concat()
                        newArr[5] = '1'
                        newArr[6] = '2'
                        return newArr
                    })
                    nextToK8 = true
                    setLifetime('2')
                    setPast('1')
                    registerDiagnosis('2', '1')
                }
            }
            
            if(questionInd == 23){
                if(checked[questionInd] == '3' || checked[questionInd+1] == '3') {
                    setSaved(true)
                    setSectionScores(() => {
                        const newArr = sectionScores.concat()
                        newArr[5] = '1'
                        newArr[6] = '2'
                        return newArr
                    })
                    nextToK8 = true
                    setLifetime('2')
                    setPast('1')
                    registerDiagnosis('2', '1')
                }
                else{
                    console.log('SectionScores')
                    if(sectionScores[1] == '2' || sectionScores[2] == '2') {
                        setSaved(true)
                        setSectionScores(() => {
                            const newArr = sectionScores.concat()
                            newArr[5] = '3'
                            newArr[6] = '2'
                            return newArr
                        })
                        nextToK8 = true
                        setLifetime('2')
                        setPast('1')
                        registerDiagnosis('2', '1')
                    }
                    else if(sectionScores[0] == '3' && sectionScores[1] == '3' && sectionScores[2] == '3' && 
                        sectionScores[3] == '3' && sectionScores[4] == '3') {
                            setSectionScores(() => {
                                const newArr = sectionScores.concat()
                                newArr[5] = '3'
                                newArr[6] = '3'
                                return newArr
                            })
                        }
                    else {
                        setSectionScores(() => {
                            const newArr = sectionScores.concat()
                            newArr[5] = '3'
                            newArr[6] = '1'
                            return newArr
                        })
                        goToClepto = true
                        saveDiagnosis('1', '1')
                    }
                }
            }

            if(questionInd == 25){
                setSectionScores(() => {
                    const newArr = sectionScores.concat()
                    newArr[7] = checked[questionInd]
                    return newArr
                })

                if(checked[25] == '1') nextToK7 = true
            }
            
            if(questionInd == 26){
                nextToK9 = true
                setSectionScores(() => {
                    const newArr = sectionScores.concat()
                    newArr[8] = checked[questionInd]
                    newArr[9] = null
                    newArr[10] = '0'
                    return newArr
                })
            }

            if(questionInd == 27){
                setSectionScores(() => {
                    const newArr = sectionScores.concat()
                    newArr[9] = checked[questionInd]
                    return newArr
                })
            }
            
            if(questionInd == 28 && parseInt(checked[questionInd]) > 0 && parseInt(checked[questionInd]) < 100) {
                setSectionScores(() => {
                    const newArr = sectionScores.concat()
                    newArr[10] = checked[questionInd]
                    return newArr
                })
            }

            if(questionInd == 29 && parseInt(checked[questionInd]) > 0 && parseInt(checked[questionInd]) < 100) {
                setSectionScores(() => {
                    const newArr = sectionScores.concat()
                    newArr[11] = checked[questionInd]
                    return newArr
                })
            }

            //Curso normal -> Vá para o próximo conjunto de questões
            if(!nextToK7 && !nextToK8 && !nextToK9 && !goToClepto && !(questionInd == 29)){
                setQuestionInd(nextSection)
                setSectionInd(sectionInd+1)
            }
            else if(nextToK7 && !goToClepto){
                setQuestionInd(27)
                setSectionInd(14)
            }
            else if(nextToK8 && !goToClepto){
                setQuestionInd(28)
                setSectionInd(15)
            }
            else if(nextToK9 && !goToClepto){
                setQuestionInd(29)
                setSectionInd(16)
            }
            else if(questionInd == 29) setFinish(true)
        }
        else alert('Responda a todas as perguntas presentes na tela!')
    }

    useEffect(() => {
        showQuestion()
    }, [questionInd])

    useEffect(() =>{
        if(questionInd == 3 && checked[2] == '1' && checked[5] == '1') 
            saveDiagnosis('1', '1')
        
        if(questionInd == 6 && checked[6] == '1')
            saveDiagnosis('1', '1')
        
        if(questionInd == 7 && checked[7] == '1')
            saveDiagnosis('1', '1')

        if(questionInd == 12 && checked[8] == '1' && checked[9] == '1' && checked[10] == '1' && 
                checked[11] == '1' && checked[12] == '1') saveDiagnosis('1', '1')
        
        if(questionInd == 14 && checked[14] == '1') 
            saveDiagnosis('1', '1')
        
        if(questionInd == 29 && finish){
            if(!saved) saveDiagnosis('3', checked[25])
            else saveAnswers()
        }
    }, [sectionScores])

    const minusQuestion = () => {
        if(questionInd == 0){
            navigation.goBack()
        }
        if(checked){
            setQuestionInd(questionInd - qtdQuestions[sectionInd-1])
            setSectionInd(sectionInd-1)
        }
    }

    const showCriteria = () => {
        switch(questionInd+1){
            case 1:
                return ["Critério A1", "Agressão verbal (p. ex., acessos de raiva, injúrias, discussões, ou agressões verbais), ou agressão física dirigida a propriedades, animais, ou outros indivíduos, ocorrendo em uma média de duas vezes por semana, durante um período de três meses. A agressão física não resulta em danos ou destruição de propriedades, nem em lesões físicas em animais, ou em outros indivíduos."]
            case 4:
                return ["Critério A2", "Três explosões comportamentais envolvendo danos, ou destruição de propriedades e/ou agressão física envolvendo lesões físicas contra animais, ou outros indivíduos ocorrendo dentro de um período de 12 meses."]
            case 7:
                return ["Critério B", "A magnitude da agressividade expressa durante as explosões recorrentes é grosseiramente desproporcional em relação à provocação, ou a quaisquer estressores psicossociais precipitantes."]
            case 8:
                return ["Critério C", "As explosões de agressividade recorrentes não são premeditadas (i.e., são impulsivas e/ou decorrentes de raiva) e não tem por finalidade atingir algum objetivo tangível (p. ex., dinheiro, poder, intimidação)."]
            case 9:
            case 12:
                return ["Critério D", "As explosões de agressividade recorrentes causam sofrimento acentuado ao indivíduo, ou prejuízo no funcionamento profissional, ou interpessoal, ou estão associadas a consequências financeiras, ou legais."]
            case 15:
                return ["Critério E", "A idade cronológica é de pelo menos 6 anos (ou nível de desenvolvimento equivalente)."]
            case 16:
            case 18: 
            case 20:
            case 22:
            case 24:
                return ["Critério F", "As explosões de agressividade recorrentes NÃO são melhor explicadas por outro transtorno mental e não são atribuíveis a outra condição médica ou aos efeitos fisiológicos de uma substância. No caso de crianças com idade entre 6 e 18 anos, o comportamento agressivo que ocorre como parte do transtorno de adaptação não deve ser considerado para esse diagnóstico."]
            default:
                return ""
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View style={{flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                justifyContent: 'center',
                alignItems: 'center'}}>
                    <View style={{margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 25,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,}}>
                        <Text style={{marginBottom: 15, color: 'black', fontSize: 18, fontWeight: 'bold'}}>{showCriteria()[0]}</Text>
                        <Text style={{marginBottom: 15, color: 'black', fontSize: 16, textAlign: 'justify'}}>{showCriteria()[1]}</Text>
                        <TouchableHighlight style={[styles.buttonPrev, {marginBottom: 0}]} onPress={()=>{setModalVisible(!modalVisible)}}>
                            <Text style={{color: '#fff', fontSize: 15}}>Fechar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', marginTop: 20}}>
                <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, marginLeft:20, padding: 10}} onPress={() => navigation.navigate("ScreenSCID", {user: user})}>
                <Image
                    source={require('../assets/logout.png')}
                    style={{height: 30,
                    width: 30,
                    resizeMode: 'stretch'}}
                />
                </TouchableOpacity>
                <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCID-TCIm"}</Text>
                {questionInd <= 24 ?
                <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, marginRight:20, padding: 10}} onPress={() => {setModalVisible(true)}}>
                <Image
                    source={require('../assets/diagnostico.png')}
                    style={{height: 30,
                    width: 30,
                    resizeMode: 'stretch'}}
                />
                </TouchableOpacity> :
                <View style={{backgroundColor: '#87ceeb', borderRadius: 10, marginRight:20, width: 50, height: 50}}/>
                }
            </View>
            <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold', marginTop: 30, marginHorizontal: 20, textAlign: 'center'}}>
                {questionInd <= 24 ? "Transtorno Explosivo Intermitente (TEI)" : "Cronologia do TEI"}</Text>
                
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={80}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{flex: 1, justifyContent: 'space-evenly'}}>
                        {showQuestion()}
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            {(!inputFocused || !isKeyboardVisible) && 
            <View style={{flexDirection: 'row', justifyContent:'space-around', marginBottom: 0}}>
                <TouchableOpacity style={styles.buttonPrev} onPress={minusQuestion}>
                    <Text style={{color: '#fff', fontSize: 15}}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNext} onPress={plusQuestion}>
                    <Text style={{color: '#fff', fontSize: 15}}>Próximo</Text>
                </TouchableOpacity>
            </View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonNext:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 100, 
        backgroundColor: '#097969',
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 30
    },
    buttonPrev:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 100, 
        backgroundColor: '#b20000',
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 30
    },
    input: {
        marginBottom: 20,
        marginHorizontal: 20,
        textShadowColor: '#000',
        color: '#000',
        borderBottomWidth: 1,
        borderColor: 'grey',
        backgroundColor: '#fff',
        fontSize: 16,
        width: 300
    },
    containerQuestion:{
        backgroundColor: 'white', 
        borderRadius: 20, 
        marginHorizontal: 20, 
        marginTop: 20
    },
    textQuestion:{
        color: '#000', 
        fontSize: 17, 
        marginHorizontal: 20, 
        fontWeight: 'bold', 
        marginTop: 10, 
        textAlign: 'justify'
    },
    textObs:{
        color: '#00009c', 
        fontSize: 15, 
        textAlign:'justify', 
        fontWeight: 'bold', 
        marginVertical: 15, 
        marginHorizontal: 20
    }
})