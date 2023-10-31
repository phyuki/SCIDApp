import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  BackHandler
} from 'react-native';
import config from './config/config.json'
import RadioButton3Items from './radiobutton3Items';
import { RadioButton } from 'react-native-paper';
import RadioButtonHorizontal from './radiobutton';
import { TextInputMask } from 'react-native-masked-text';

export default function JogoPatologico({route, navigation}){

    const { patient, questions } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    const [dateStart, setDateStart] = useState()
    const [dateEnd, setDateEnd] = useState()
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const [finish, setFinish] = useState(false)
    const qtdQuestions = [1, 1, 1, 4, 4, 4, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    const textQuestion = (index) => {
      return questions[index][1]+" - "+questions[index][2]
    }

    const question2Choices = (questionInd) => {
      return(<>
        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
        <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
          setChecked={setChecked}/>
      </>)
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

    const questionK32a2 = () =>{
      return (
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
          <TextInputMask
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            type={'datetime'}
            options={{ format: 'DD/MM' }}
            placeholder="DD/MM"
            value={dateStart}
            onChangeText={setDateStart}
          />
          <TextInputMask
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            type={'datetime'}
            options={{ format: 'DD/MM' }}
            placeholder="DD/MM"
            value={dateEnd}
            onChangeText={setDateEnd}
          />
          <Text style={styles.textObs}>Observação: codificar 99 / 99 se houve apenas apostas esporádicas ao longo da vida, sem um período específico.</Text>
        </View>
      )
    }

    function questionsK32(){
      return(<>
          <View style={styles.containerKTEIB}>
                  <Text style={styles.textKTEIB}>{textQuestion(questionInd)}</Text>
                  <RadioButtonHorizontal direction={'column'} checked={checked} questionInd={questionInd} 
                      setChecked={setChecked}/>
          </View>
          <View style={styles.containerKTEIB}>
                  <Text style={styles.textKTEIB}>{textQuestion(questionInd+1)}</Text>
                  <RadioButtonHorizontal direction={'column'} checked={checked} questionInd={questionInd+1} 
                      setChecked={setChecked}/>
          </View>
          <View style={styles.containerKTEIB}>
                  <Text style={styles.textKTEIB}>{textQuestion(questionInd+2)}</Text>
                  <RadioButtonHorizontal direction={'column'} checked={checked} questionInd={questionInd+2} 
                      setChecked={setChecked}/>
          </View>
          <View style={styles.containerKTEIB}>
                  <Text style={styles.textKTEIB}>{textQuestion(questionInd+3)}</Text>
                  <RadioButtonHorizontal direction={'column'} checked={checked} questionInd={questionInd+3} 
                      setChecked={setChecked}/>
          </View>
          </>
      )
    }

    function showQuestion(){
      switch(questionInd+1){
          case 1:
            return (
              <View style={styles.containerQuestion}>
                {question2Choices(questionInd)}
              </View>)
          case 2:
            return questionK32a2()
          case 3:
            return questionsK32()
          case 7:
            return questionsK32()
          case 11:
            return questionsK32()
          case 15:
            return (<>
              {questionsK32()}
              {checked[questionInd+3] == '3' ?
                <TextInput style={styles.input}
                    onChangeText={setInput}
                    value={input}
                    placeholder='Especificar'
                    placeholderTextColor='gray'/> : null}
              </>)
          case 19:
            return(<>
              <View style={styles.containerKTEIB}>
                      <Text style={styles.textKTEIB}>{textQuestion(questionInd)}</Text>
                      <RadioButtonHorizontal direction={'column'} checked={checked} questionInd={questionInd} 
                          setChecked={setChecked}/>
              </View>
              <View style={styles.containerKTEIB}>
                      <Text style={styles.textKTEIB}>{textQuestion(questionInd+1)}</Text>
                      <RadioButtonHorizontal direction={'column'} checked={checked} questionInd={questionInd+1} 
                          setChecked={setChecked}/>
              </View>
              {checked[questionInd+1] == '3' ?
                <TextInput style={styles.input}
                    onChangeText={setInput}
                    value={input}
                    placeholder='Especificar'
                    placeholderTextColor='gray'/> : null}
              </>)
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
          case 26:
          case 27:
          case 28:
          case 29:
          case 30:
            return question3Choices()
          case 31:
          case 32:
            return (
              <View style={styles.containerQuestion}>
                {question2Choices(questionInd)}
              </View>)
          case 33:
            return (
              <View style={styles.containerQuestion}>
                  <Text style={{color: '#00009c', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                      <RadioButton3Items direction={'row'} color={'#00009c'} questionInd={questionInd} 
                          options={['1 - Leve', '2 - Moderado', '3 - Grave']} checked={checked} setChecked={setChecked}/>
                      <View style={{marginTop: 10}}/>
                      <Text style={styles.textObs}>
                      1 - Poucos (se alguns) sintomas excedendo aqueles necessários para o diagnóstico presente, e os sintomas resultam em não mais do que um 
                      comprometimento menor seja social ou no desempenho ocupacional.</Text>
                      <Text style={styles.textObs}>
                      2 - Sintomas ou comprometimento funcional entre “leve” e “grave” estão presentes.</Text>
                      <Text style={styles.textObs}>
                      3 - Vários sintomas excedendo aqueles necessários para o diagnóstico, ou vários sintomas particularmente graves estão presentes, 
                      ou os sintomas resultam em comprometimento social ou ocupacional notável.</Text>
                      <View style={{marginBottom: 10}}/>
              </View>)
          case 34:
            return(
              <View style={styles.containerQuestion}>
                  <Text style={{color: '#00009c', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                      <RadioButton3Items direction={'column'} color={'#00009c'} questionInd={questionInd} 
                          options={['Em Remissão parcial', 'Em Remissão total', 'História prévia']} checked={checked} setChecked={setChecked}/>
                      <View style={{marginBottom: 10}}/>
              </View>)
          case 35:
            return(<>
              <View style={styles.containerQuestion}>
                  <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                  <TextInput style={styles.input}
                  onChangeText={setInput}
                  value={input}/>
              </View></>)
          case 36:
            return(<>
              <View style={styles.containerQuestion}>
                  <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                  <TextInput style={styles.input}
                  onChangeText={setInput}
                  value={input}/>
                  <Text style={styles.textObs}>Observação: codificar 99 se desconhecida</Text>
              </View></>)
          default:
              console.log("Error")
      }
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      let goToPyro = false, nextToK29 = false, nextToK30 = false, nextToK31 = false
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]

      setQuestionInd(nextQuestion)
      setNextInd(nextInd+1)
    }

    useEffect(() => {
        showQuestion()
    }, [questionInd])

    useEffect(() => {
      if(questionInd == 30 && finish) saveAnswers()
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

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
          <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCID-TCIm"}</Text>
              <Text style={{color: '#000', fontSize: 22, fontWeight: 'bold', marginTop: 30, marginHorizontal: 20, textAlign: 'center'}}>
                {questionInd < 13 ? "Jogo Patológico" : "Cronologia do Jogo Patológico"}</Text>
          </View>
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
      fontSize: 17,  
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
    containerKTEIB: {
      flex: 1, 
      backgroundColor: 'white', 
      borderRadius: 20, 
      marginTop: 10, 
      flexDirection: 'row'
  },
  textKTEIB:{
      flex:1, 
      color: '#000', 
      fontSize: 17, 
      marginHorizontal: 20, 
      fontWeight: 'bold', 
      marginTop: 10, 
      textAlign: 'justify'
  },
})