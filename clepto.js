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

export default function Cleptomania({route, navigation}){

    const { patient, questions } = route.params

    const [checked, setChecked] = useState([])
    const [input, setInput] = useState()
    //Variáveis para controlar o múltiplo input da questão K10A/K10B/K10C
    const [firstOpt, setFirstOpt] = useState('')
    const [secondOpt, setSecondOpt] = useState('')
    const [thirdOpt, setThirdOpt] = useState('')
    //Vetor para controlar a questão K10D -> Múltipla escolha
    const [answerK10D, setAnswerK10D] = useState([])
    //Variável para controlar a questão K10E
    const [answerK10E, setAnswerK10E] = useState('')
    const [questionInd, setQuestionInd] = useState(0)
    const [nextInd, setNextInd] = useState(0)
    const qtdQuestions = [1, 3, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1]

    const textQuestion = (index) => {
      return questions[index][0]+" - "+questions[index][1]
    }

    const question2Choices = (questionInd) => {
      return(
      <View style={{marginBottom: 10}}>
        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
        <RadioButtonHorizontal direction={'row'} checked={checked} questionInd={questionInd} 
          setChecked={setChecked}/>
      </View>
      )
    }

    const question3Choices = () => {
      return (
      <View style={styles.containerQuestion}>
        <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
        <RadioButton3Items direction={'row'} color={'#000'} questionInd={questionInd} 
           options={['1 - Não', '2 - Talvez', '3 - Sim']} checked={checked} setChecked={setChecked}/>
      </View>
      )
    }

    const questionK10D = () => {
      return (<>
        <View style={styles.containerQuestion}>
            <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
            <View style={styles.radioButton}>
              <RadioButton
                  value="Jogou fora ou destruiu"
                  status={ answerK10D[0] === 'Jogou fora ou destruiu' ? 'checked' : 'unchecked' }
                  onPress={() => setAnswerK10D(() => {
                    const newArr = answerK10D.concat()
                    newArr[0] ? newArr[0] = null : newArr[0] = 'Jogou fora ou destruiu'
                    return newArr
                })}
                  color='#0047AB'
              />
              <Text style={styles.textRadioButton}>Jogou fora ou destruiu</Text>
          </View>
          <View style={styles.radioButton}>
              <RadioButton
                  value="Guardou, mas não usou"
                  status={ answerK10D[1] === 'Guardou, mas não usou' ? 'checked' : 'unchecked' }
                  onPress={() => setAnswerK10D(() => {
                      const newArr = answerK10D.concat()
                      newArr[1] ? newArr[1] = null : newArr[1] = 'Guardou, mas não usou'
                      return newArr
                  })}
                  color='#0047AB'
              />
              <Text style={styles.textRadioButton}>Guardou, mas não usou</Text>
          </View>
          <View style={styles.radioButton}>
              <RadioButton
                  value="Guardou e usou"
                  status={ answerK10D[2] === 'Guardou e usou' ? 'checked' : 'unchecked' }
                  onPress={() => setAnswerK10D(() => {
                    const newArr = answerK10D.concat()
                    newArr[2] ? newArr[2] = null : newArr[2] = 'Guardou e usou'
                    return newArr
                })}
                  color='#0047AB'
              />
              <Text style={styles.textRadioButton}>Guardou e usou</Text>
          </View>
          <View style={styles.radioButton}>
              <RadioButton
                  value="Doou, ou deu para alguém"
                  status={ answerK10D[3] === 'Doou, ou deu para alguém' ? 'checked' : 'unchecked' }
                  onPress={() => setAnswerK10D(() => {
                    const newArr = answerK10D.concat()
                    newArr[3] ? newArr[3] = null : newArr[3] = 'Doou, ou deu para alguém'
                    return newArr
                })}
                  color='#0047AB'
              />
              <Text style={styles.textRadioButton}>Doou, ou deu para alguém</Text>
          </View>
          <Text style={styles.textObs}>Observação: Pode assinalar mais de uma alternativa.</Text>
        </View>
      </>)
    }

    const questionK10E = () => {
      return (<>
        <View style={styles.containerQuestion}>
          <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
              <RadioButton.Group onValueChange={value => setAnswerK10E(value)} value={answerK10E}>
                <View style={styles.radioButton}>
                  <RadioButton value="Diariamente, quase todo dia" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>Diariamente, quase todo dia</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="3 a 4 vezes por semana" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>3 a 4 vezes por semana</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="1 a 2 vezes por semana" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>1 a 2 vezes por semana</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="2 a 3 vezes por mês" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>2 a 3 vezes por mês</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="1 vez por mês ou menos" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>1 vez por mês ou menos</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="1 a 3 vezes nos últimos 6 meses" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>1 a 3 vezes nos últimos 6 meses</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="1 a 3 vezes nos últimos 12 meses" color='#0047AB'/>
                  <Text style={styles.textRadioButton}>1 a 3 vezes nos últimos 12 meses</Text>
                </View>
              </RadioButton.Group>
              <Text style={styles.textObs}>Observação: Assinar apenas uma alternativa.</Text>
          </View>
      </>)
    }

    function showQuestion(){
      switch(questionInd+1){
          case 1:
            return question3Choices()
          case 2:
            return (<>
              <View style={styles.containerQuestion}>
                  <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                  <TextInput style={styles.input}
                        onChangeText={setFirstOpt}
                        value={firstOpt}
                        placeholder='1º objeto mais roubado'
                        placeholderTextColor='grey'/>
                  <TextInput style={styles.input}
                        onChangeText={setSecondOpt}
                        value={secondOpt}
                        placeholder='2º objeto mais roubado'
                        placeholderTextColor='grey'/>
                  <TextInput style={styles.input}
                        onChangeText={setThirdOpt}
                        value={thirdOpt}
                        placeholder='3º objeto mais roubado'
                        placeholderTextColor='grey'/> 
              </View>
            </>)
          case 5:
            return questionK10D()
          case 6:
            return questionK10E()
          case 7:
            return question3Choices()
          case 8:
              return question3Choices()
          case 9:
              return (<>
                <View style={styles.containerQuestion}>
                  <Text style={{color: '#000', fontSize: 17, fontWeight: 'bold', marginHorizontal: 20, marginVertical: 15, textAlign: 'justify'}}>
                    Você roubou coisas somente quando...</Text>
                  {question2Choices(questionInd)}
                  {question2Choices(questionInd+1)}
                </View>
              </>)
          case 11:
              return (<>
                <View style={styles.containerQuestion}>
                  {question2Choices(questionInd)}
                </View>
              </>)
          case 12:
              return (<>
                <View style={styles.containerQuestion}>
                  {question2Choices(questionInd)}
                  {question2Choices(questionInd+1)}
                </View>
              </>)
          case 14:
              return (<>
                <View style={styles.containerQuestion}>
                  {question2Choices(questionInd)}
                </View>
              </>)
          case 15:
            return (<>
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
              </View>
              </>)
          case 16:
            return(<>
              <View style={styles.containerQuestion}>
                  <Text style={{color: '#00009c', fontSize: 17, marginHorizontal: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'justify'}}>{textQuestion(questionInd)}</Text>
                      <RadioButton3Items direction={'column'} color={'#00009c'} questionInd={questionInd} 
                          options={['4 - Em Remissão parcial', '5 - Em Remissão total', '6 - História prévia']} checked={checked} setChecked={setChecked}/>
                      <View style={{marginBottom: 10}}/>
              </View>
              </>)
          case 17:
            return(<>
              <View style={styles.containerQuestion}>
                  <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                  <TextInput style={styles.input}
                  onChangeText={setInput}
                  value={input}
                  placeholderTextColor='grey'/>
              </View></>)
          case 18:
            return(<>
              <View style={styles.containerQuestion}>
                  <Text style={styles.textQuestion}>{textQuestion(questionInd)}</Text>
                  <TextInput style={styles.input}
                  onChangeText={setInput}
                  value={input}
                  placeholderTextColor='grey'/>
                  <Text style={styles.textObs}>Observação: codificar 99 se desconhecida</Text>
              </View></>)
          default:
              console.log("Error")
      }
    }

    const plusQuestion = () => {
      let success = true      //Variável para detectar se pelo menos 1 opção foi escolhida 
      let nextQuestion = questionInd + qtdQuestions[nextInd]
      console.log('ID: '+(questionInd+1))
      console.log('Next: '+nextQuestion)
      console.log(checked)

      for(let i=questionInd; i<nextQuestion; i++) success = success && checked[i]

      if(questionInd == 1 && firstOpt) success = true
      if(questionInd == 4 && answerK10D) success = true
      if(questionInd == 5 && answerK10E) success = true
      if(questionInd == 16 || questionInd == 17 && input) success = true

      if(success){

        if(questionInd == 1){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[1] = firstOpt
            newArr[2] = secondOpt
            newArr[3] = thirdOpt
            return newArr
        })}

        if(questionInd == 4){
          const answers = answerK10D.filter((item) => item !== null && item !== undefined)
          setChecked(() => {
            const newArr = checked.concat()
            newArr[4] = answers
            return newArr
        })}

        if(questionInd == 5){
          setChecked(() => {
            const newArr = checked.concat()
            newArr[5] = answerK10E
            return newArr
        })}

        //Curso normal -> Vá para o próximo conjunto de questões          
        setQuestionInd(nextQuestion)
        setNextInd(nextInd+1)
      }
    }

    useEffect(() => {
        showQuestion()
    }, [questionInd])

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
                {questionInd < 13 ? "Cleptomania" : "Cronologia da Cleptomania"}</Text>
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
      fontSize: 15,  
      fontWeight: 'bold', 
      marginVertical: 10, 
      marginHorizontal: 20
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