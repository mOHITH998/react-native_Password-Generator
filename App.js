import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import CheckBox from "react-native-check-box";
import * as Clipboard from 'expo-clipboard';


const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é";
export class App extends Component {
  state = {
    lowerCase: false,
    upperCase: false,
    numbers: false,
    symbols: false,
    passwordLength: 8,
    isChecked: false,
    password: "",
    description: "Average",
    copiedPassword: "",
  };
  /**This Handle's functionality of rendering the original string */

  generatePasswordHandler() {
    let characters = "";
    if (
      !this.state.lowerCase &&
      !this.state.upperCase &&
      !this.state.numbers &&
      !this.state.symbols
    ) {
      ToastAndroid.showWithGravity(
        "You must select atleast One option!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    }

    if (this.state.lowerCase) characters += lowerCase;
    if (this.state.upperCase) characters += upperCase;
    if (this.state.numbers) characters += numbers;
    if (this.state.symbols) characters += symbols;
    this.setState({ password: this.randomPassword(characters) });
    return characters;
  }
  /**This Handle's functionality of generating random string from given string value in parameter*/
  randomPassword(characters) {
    let randomStr = "";

    for (let i = 0; i < this.state.passwordLength; i++) {
      randomStr += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    // console.log(randomStr);
    return randomStr;
  }
  backgroundColor(length) {
    if (length === 8) return "#faa200";
    if (length >= 9 && length <= 17) return "#99cc33";
    if (length >= 18 && length <= 32) return "#339900";
  }
  descriptionHandler() {
    let description = "";
    if (this.state.passwordLength === 8) {
      return (description = "Average");
    } else if (
      this.state.passwordLength >= 9 &&
      this.state.passwordLength <= 17
    ) {
      return (description = "Better");
    } else if (
      this.state.passwordLength >= 18 &&
      this.state.passwordLength <= 32
    ) {
      return (description = "Excellent!");
    }
    return description;
  }

  copyToClipboard() {
    Clipboard.setString(this.state.password);
    ToastAndroid.showWithGravity(
      "copied to Clipboard!",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  }

  componentDidUpdate() {
    this.backgroundColor(this.state.passwordLength);
    this.descriptionHandler();
  }


  render() {
    return (
      <View style={styles.stringWrapper}>
        <Text style={styles.mainTitle}>Password Generator</Text>
        <Text style={styles.mainDesp}>
          Secure your account by generating strong password!
        </Text>
        <TextInput
          style={styles.input}
          selectTextOnFocus={false}
          editable={false}
          value={this.state.password}
          textAlign={"center"}
        />
        <TouchableOpacity
          style={styles.clipboardWrapper}
          activeOpacity={0.6}
          onPress={() => this.copyToClipboard()}
        >
          <Text style={styles.clipboard}>Click here to copy</Text>
        </TouchableOpacity>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={8}
          maximumValue={32}
          thumbTintColor={this.backgroundColor(this.state.passwordLength)}
          maximumTrackTintColor={this.backgroundColor(
            this.state.passwordLength
          )}
          minimumTrackTintColor={this.backgroundColor(
            this.state.passwordLength
          )}
          value={8}
          onValueChange={(e) =>
            this.setState({ passwordLength: Math.floor(e) })
          }
        />
        <View style={styles.lengthWrapper}>
          <Text
            style={[
              styles.text,
              { color: this.backgroundColor(this.state.passwordLength) },
            ]}
          >
            {this.state.passwordLength}
          </Text>
          <Text
            style={{ color: this.backgroundColor(this.state.passwordLength) }}
          >
            {this.descriptionHandler()}
          </Text>
        </View>
        <CheckBox
          style={styles.checkbox}
          leftText={"lowercase"}
          onClick={() => this.setState({ lowerCase: !this.state.lowerCase })}
          leftTextStyle={{ color: "#f4f4f4", fontWeight: "600" }}
          checkBoxColor={"#f9aa33"}
          isChecked={this.state.lowerCase}
        />
        <CheckBox
          style={styles.checkbox}
          leftText={"uppercase"}
          leftTextStyle={{ color: "#f4f4f4", fontWeight: "600" }}
          onClick={() => this.setState({ upperCase: !this.state.upperCase })}
          checkBoxColor={"#f9aa33"}
          isChecked={this.state.upperCase}
        />
        <CheckBox
          style={styles.checkbox}
          leftText={"numbers"}
          onClick={() => this.setState({ numbers: !this.state.numbers })}
          leftTextStyle={{ color: "#f4f4f4", fontWeight: "600" }}
          checkBoxColor={"#f9aa33"}
          isChecked={this.state.numbers}
        />
        <CheckBox
          style={styles.checkbox}
          leftText={"symbols"}
          onClick={() => this.setState({ symbols: !this.state.symbols })}
          leftTextStyle={{ color: "#f4f4f4", fontWeight: "600" }}
          checkBoxColor={"#f9aa33"}
          isChecked={this.state.symbols}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.generatePasswordHandler()}
          activeOpacity={0.7}
        >
          <Text style={{ color: "#232f34", fontSize: 16, fontWeight: "700" }}>
            Generate
          </Text>
        </TouchableOpacity>
        <Text style={{ color: "#fff", left: "10%" }}>
          💡Tip: Save copied password to Google Keep 📒
        </Text>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  mainTitle: {
    fontWeight: "700",
    color: "#f9aa33",
    textTransform: "uppercase",
    marginHorizontal: "10%",
    fontSize: 25,
    padding: 2,
  },
  mainDesp: {
    color: "#fff",
    marginBottom: 25,
    padding: 2,
    marginHorizontal: 10,
  },
  stringWrapper: {
    flex: 1,
    backgroundColor: "#232f34",
    padding: 15,
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#212121",
    shadowColor: "#ccc",
    shadowOpacity: 2,
    elevation: 10,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: "700",
    // backgroundColor: "#fff",
    padding: 10,
    paddingBottom: 0,
    // paddingHorizontal: 20,
    // borderRadius: 40,
  },
  checkbox: {
    padding: 10,
    borderBottomColor: "#fff",
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
    borderBottomWidth: 1,
  },
  lengthWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9aa33",
    padding: 10,
    marginVertical: 15,
    borderRadius: 12,
  },
  clipboardWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.6,
    borderColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 95,
  },
  clipboard: {
    color: "#fff",
    textTransform: "uppercase",
    padding: 5,
  },
});
