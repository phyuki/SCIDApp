import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  BackHandler,
  Modal,
  TouchableHighlight,
  Image
} from 'react-native';
import config from '../config/config.json'
import RadioButton3Items from '../radiobutton3Items';
import { RadioButton } from 'react-native-paper';
import RadioButtonHorizontal from '../radiobutton';

export default function Escoriacao({route, navigation}){

    const { user, patient, questions } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [finish, setFinish] = useState(false)
    const [answerK156, setAnswerK156] = useState()
    const [lifetime, setLifetime] = useState()
    const [past, setPast] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const qtdQuestions = [1, 1, 1, 1, 1, 1, 1, 4, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    const textQuestion = (index) => {
      return questions[index][1]+" - "+questions[index][2]
    }

    const question2Choices = (questionInd) => {
      return(
        <View style={styles.containerQuestion}>
            <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
            <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
              setChecked={setChecked}/>
          </View>)
    }

    const question3Choices = () => {
      return (
      <View style={styles.containerQuestion}>
        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
        <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
           options={['Não', 'Talvez', 'Sim']} checked={checked} setChecked={setChecked}/>
      </View>
      )
    }

    const reverseQuestion = (textAbove, textWarning) => {
      return (
        <View style={styles.containerQuestion}>
          <Text style={styles.textObs}>Atenção: Questão Reversa!</Text>
          <Text style={styles.textQuestion}>
            {textAbove}</Text>
          <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
          <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
            options={['Sim', 'Talvez', 'Não']} checked={checked} setChecked={setChecked}/>
          <Text style={styles.textObs}>{'Obs.: Sim = Atenção para '+textWarning}</Text>
        </View> )
    }

    const questionK156 = () => {
      return (
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
          <RadioButton.Group onValueChange={value => setAnswerK156(value)} value={answerK156}>
                <View style={styles.radioButton}>
                  <RadioButton value="1" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>Sem dificuldade</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="2" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>Alguma dificuldade</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="3" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>Muita dificuldade</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="4" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>Dificuldade extrema</Text>
                </View>
          </RadioButton.Group>
          <View style={{marginBottom: 10}}/>
        </View>
      )
    }

    function showQuestion(){
      switch(questionInd+1){
          case 1:
            return question3Choices()
          case 2:
            return (
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <TextInput style={styles.input}
                    onChangeText={setInput}
                    value={input}
                    placeholder='Duração da última fase'
                    placeholderTextColor='gray'
                    maxLength={3}
                    keyboardType='numeric'/>
                <Text style={styles.textObs}>Observação: se for contínuo, sem pausa por mais de três anos, assinalar 999.</Text>
              </View> )
          case 3:
            return (
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                <TextInput style={styles.input}
                    onChangeText={setInput}
                    value={input}
                    placeholderTextColor='gray'
                    autoCapitalize='sentences'/>
                <Text style={styles.textObs}>{'Observação: cutucar a cutícula também é considerado Transtorno de Escoriação. Se a(o) paciente não tiver uma área preferencial marcar “Indiferente”.'}</Text>
              </View> )
          case 4:
            return question2Choices(questionInd)
          case 5:
          case 6:
          case 7:
            return question3Choices()
          case 8:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  {'(Cutucar) a pele já fez você sofrer a ponto de...'}</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {question2Choices(questionInd+2)}
              {question2Choices(questionInd+3)}
            </>)
          case 12:
            return(<>
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>
                  {'(Cutucar) a pele já fez você sofrer a ponto de...'}</Text>
                <View style={{marginBottom: 10}}/>
              </View>
              {question2Choices(questionInd)}
              {question2Choices(questionInd+1)}
              {checked[questionInd+1] == '3' ?
              <View style={styles.containerQuestion}>
                <Text style={styles.textQuestion}>{textQuestion(questionInd+2)}</Text>
                <TextInput style={styles.input}
                    onChangeText={setInput}
                    value={input}
                    placeholder='Descrever'
                    placeholderTextColor='gray'/>
              </View> : null}
            </>)
          case 15:
            return reverseQuestion('Você cutucava a sua pele...', 'Efeito fisiológico do consumo de substâncias')
          case 16:
            return reverseQuestion('Você cutucava a sua pele...', 'Condição Médica Geral')
          case 17:
            return reverseQuestion('Você (cutuca) sua pele para se livrar de...', 'Sintomas de delírio de infestação')
          case 18:
            return reverseQuestion('Você (cutuca) sua pele para se livrar de...', 'Transtorno Dismórfico Corporal')
          case 19:
            return questionK156()
          case 20:
            return question2Choices(questionInd)
          case 21:
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
          case 22:
            return(<>
              <View style={styles.containerQuestion}>
                  <Text style={styles.textObs}>Observação: Não deve ser lida para o paciente</Text>
                  <Text style={{color: 'black', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                      <RadioButton3Items direction={'column'} color={'black'} questionInd={questionInd} 
                          options={['Em remissão parcial', 'Em remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
              </View>
              </>)
          case 23:
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
          case 24:
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
              disorder: 'Escoriacao',
              patientId: patient
          })
      })
      let resp = await reqs.json()
      return resp
    }

    async function registerAnswers() {

      let questionId = questions.map((array) => array[0])
      
      let reqs = await fetch(config.urlRootNode+'answers', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            disorder: 'Escoriacao',
            answers: checked,
            patientId: patient,
            questionId: questionId
          })
      })
      let resp = await reqs.json()
      return resp
    }

    async function saveDiagnosis(lifetime, past){
      const answers = await registerAnswers()
      registerDiagnosis(lifetime, past).then(
        navigation.navigate('ShowPartial', {user: user, patient: patient, 
          lifetime: lifetime, past: past, disorderPrev: 'Transtorno de Escoriação', 
          disorderNext: 'Videogame'}))
    }

    async function saveAnswers(){
      registerAnswers().then(
        navigation.navigate('ShowPartial', {user: user, patient: patient, 
          lifetime: lifetime, past: past, disorderPrev: 'Transtorno de Escoriação', 
          disorderNext: 'Videogame'}))
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let goToVideogame = false, nextToK160 = false, nextToK161 = false, nextToK162 = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]

      if((questionInd == 1 || questionInd == 2) && input) success = true
      if(questionInd == 11 && (checked[questionInd+1] == '1' || (checked[questionInd+1] == '3' && input)))
        success = true
      if(questionInd == 18 && answerK156) success = true
      if((questionInd == 22 || questionInd == 23) && input) success = true

      if(success){

        if(questionInd == 0 && checked[0] == '1'){
          goToVideogame = true
          saveDiagnosis('1', '1')
        }

        if(questionInd == 1 || questionInd == 2){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[questionInd] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 4 && parseInt(checked[4]) < 3){
          nextToK161 = true
          setLifetime('2')
          setPast('1')
          registerDiagnosis('2', '1')
        }

        if(questionInd == 11){
          if(checked[questionInd+1] == '3'){
            setChecked(() => {
              const newArr = checked.concat()
              newArr[questionInd+2] = input
              return newArr
            })
            setInput('')
          }
          if(checked[7] == '1' && checked[8] == '1' && checked[9] == '1' && 
            checked[10] == '1' && checked[11] == '1' && checked[12] == '1'){
              nextToK161 = true
              setLifetime('2')
              setPast('1')
              registerDiagnosis('2', '1')
          }
        }

        if(questionInd == 15 && !(checked[14] == '3' && checked[15] == '3')){
          nextToK161 = true
          setLifetime('2')
          setPast('1')
          registerDiagnosis('2', '1')
        }

        if(questionInd == 17 && !(checked[16] == '3' && checked[17] == '3')){
          nextToK161 = true
          setLifetime('2')
          setPast('1')
          registerDiagnosis('2', '1')
        }

        if(questionInd == 18){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[questionInd] = answerK156
            return newArr
          })
        }

        if(questionInd == 19){
          if(checked[19] == '1'){
            nextToK160 = true
            setLifetime('3')
            setPast('1')
            registerDiagnosis('3', '1')
          }
          else{
            setLifetime('3')
            setPast('3')
            registerDiagnosis('3', '3')
          }
        }

        if(questionInd == 20){
          nextToK162 = true
          setChecked(() => {
              const newArr = checked.concat()
              newArr[20] = checked[20]
              newArr[21] = null
              newArr[22] = '0'
              return newArr
          })
        }

        if(questionInd == 22){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[22] = input
            return newArr
          })
          setInput('')
        }

        if(questionInd == 23){
          goToVideogame = true
          setChecked(() => {
            const newArr = checked.concat()
            newArr[23] = input
            return newArr
          })
        }

        //Curso normal -> Vá para o próximo conjunto de questões          
        if(!goToVideogame && !nextToK160 && !nextToK161 && !nextToK162){
          setQuestionInd(nextQuestion)
          setNextInd(nextInd+1)
        }
        else if(nextToK160){
          setQuestionInd(21)
          setNextInd(16)
        }
        else if(nextToK161){
          setQuestionInd(22)
          setNextInd(17)
        }
        else if(nextToK162){
          setQuestionInd(23)
          setNextInd(18)
        }
        else if(questionInd == 23) setFinish(true)
      }
    }

    useEffect(() => {
      showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 23 && finish) saveAnswers()
    }, [checked])

    const minusQuestion = () => {
      if(questionInd == 0){
          navigation.goBack()
      }
      if(checked){
          setQuestionInd(questionInd - qtdQuestions[nextInd-1])
          setNextInd(nextInd-1)
      }
    }

    const showCriteria = () => {
      switch(questionInd+1){
        case 1:
          return ["Critério A", "Beliscar a pele de forma recorrente, resultando em lesões."]
        case 5:
          return ["Critério B", "Tentativas repetidas de reduzir, ou parar o comportamento de beliscar a pele."]
        case 8:
        case 12:
          return ["Critério C", "O ato de beliscar a pele causa sofrimento clinicamente significativo, OU prejuízo no funcionamento social, profissional, OU em outras áreas importantes da vida do indivíduo."]
        case 15:
        case 16:
          return ["Critério D", "O ato de beliscar a pele não se deve aos efeitos fisiológicos de uma substância (por exemplo cocaína), ou a outra condição médica (por exemplo escabiose)."]
        case 17:
        case 18:
          return ["Critério E", "O ato de beliscar a pele não é melhor explicado pelos sintomas de outro transtorno mental (por exemplo delírios ou alucinações táteis em um transtorno psicótico, tentativas de melhorar um defeito ou falha percebida na aparência no transtorno dismórfico corporal ou intenção de causar danos a si mesmo na autolesão não suicida)."]
        default:
          return ""
      }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
          <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}>
                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.75)', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5,}}>
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
                {!((questionInd >= 1 && questionInd <= 3) || (questionInd >= 5 && questionInd <= 6)) && questionInd < 18 ?
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
            <Text style={{color: '#000', fontSize: 22, fontWeight: 'bold', marginTop: 30, marginHorizontal: 20, textAlign: 'center'}}>
                {questionInd < 19 ? "Transtorno de Escoriação" : "Cronologia do Transtorno de Escoriação"}</Text>
          
          <View style={{flex: 1, justifyContent: 'space-evenly'}}>
            {showQuestion()}
                <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                    <TouchableOpacity style={styles.buttonPrev} onPress={minusQuestion}>
                        <Text style={{color: '#fff', fontSize: 15}}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNext} onPress={plusQuestion}>
                        <Text style={{color: '#fff', fontSize: 15}}>Próximo</Text>
                    </TouchableOpacity>
                </View>
          </View>
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
        borderRadius: 10
    },
    buttonPrev:{
      alignItems: 'center',
      justifyContent: 'center', 
      height: 40,
      width: 100, 
      backgroundColor: '#b20000',
      borderRadius: 10
    },
    input: {
      marginBottom:20,
      marginHorizontal:20,
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
        marginHorizontal: 20
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
      fontSize: 16,  
      fontWeight: 'bold', 
      marginVertical: 10, 
      marginHorizontal: 20,
      textAlign: 'justify'
    },
    radioButton:{
      flexDirection: 'row', 
      alignItems: 'center', 
      marginVertical: 10, 
      marginHorizontal: 20
    },
    textRadioButton:{
      color: '#000', 
      fontSize: 17, 
      fontWeight: 'bold'
    },
})