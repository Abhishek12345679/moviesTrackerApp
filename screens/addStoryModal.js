import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Switch,
  Keyboard,
} from "react-native";

import { Formik } from "formik";

import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";

import * as UserActions from "../store/actions/UserActions";

import Story from "../models/Story";

const addStoryModal = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  return (
    <View style={styles.screen}>
      <Formik
        initialValues={{
          title: "",
          genres: "",
          language: "",
          movieLink: "",
          //   hasSubtitles: false,
        }}
        onSubmit={async (values) =>
          await dispatch(
            UserActions.addStory(
              Math.random().toString(),
              values.title,
              values.genres,
              values.language,
              values.movieLink
            )
          )
        }
      >
        {(formikProps) => (
          <View style={styles.screen}>
            <View style={styles.header}>
              <View stle={styles.headerTextContainer}>
                <Text style={styles.BigText}>Share Movies</Text>
                <Text style={styles.smallText}>Share Joy</Text>
              </View>
              <Button
                title="share"
                color={Colors.lightblue}
                onPress={() => {
                  formikProps.handleSubmit();
                  navigation.goBack();
                }}
              />
            </View>
            <View style={{ flexDirection: "column", marginTop: 20 }}>
              <TextInput
                color={Colors.white}
                autoFocus
                style={styles.inputField}
                placeholder="Movie Title"
                placeholderTextColor={Colors.grey}
                value={formikProps.values.title}
                onChangeText={formikProps.handleChange("title")}
              />
              <TextInput
                color={Colors.white}
                style={styles.inputField}
                placeholder="Genres"
                placeholderTextColor={Colors.grey}
                value={formikProps.values.genres}
                onChangeText={formikProps.handleChange("genres")}
              />
              <TextInput
                color={Colors.white}
                style={styles.inputField}
                placeholder="original language"
                placeholderTextColor={Colors.grey}
                value={formikProps.values.language}
                onChangeText={formikProps.handleChange("language")}
              />
              <TextInput
                color={Colors.white}
                style={styles.inputField}
                placeholder="https://"
                placeholderTextColor={Colors.grey}
                value={formikProps.values.movieLink}
                onChangeText={formikProps.handleChange("movieLink")}
                onBlur={() => {
                  Keyboard.dismiss();
                }}
              />
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* <Text style={styles.smallText}>Subtitles</Text>
                <Switch
                  value={formikProps.values.hasSubtitles}
                  onValueChange={(value) =>
                    formikProps.setFieldValue("hasSubtitles", value)
                  }
                /> */}
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#2e2d2d",
    // shadowOpacity: 0.5,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTextContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  BigText: {
    fontFamily: "apple-bold",
    fontSize: 25,
    color: Colors.white,
  },
  smallText: {
    fontFamily: "apple-regular",
    fontSize: 15,
    color: Colors.white,
  },
  inputField: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    marginVertical: 20,
    paddingVertical: 5,
  },
});

export default addStoryModal;
