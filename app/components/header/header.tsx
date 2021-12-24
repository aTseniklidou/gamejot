import React, {useState} from "react"
import { View, ViewStyle, StyleProp } from "react-native"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { translate } from "../../i18n/"
import { TextField } from "../text-field/text-field"

import { IconTypes } from "../icon/icons"
import { ICON, INPUT, ROOT, TITLE, TITLE_MIDDLE } from "./styles"
import { useStores } from "../../models"
import { BAR } from "../../screens/main/styles"
import { SafeAreaView } from "react-native-safe-area-context"

export interface HeaderProps {
  headerText?: string
  headerId?: number
  leftIcon?: IconTypes
  onLeftPress?(): void
  rightIcon?: IconTypes
  onRightPress?(): void
  style?: StyleProp<ViewStyle>
}
export function Header(props: HeaderProps) {
  const {
    headerText,
    headerId,
    style,
  } = props
  const [isEdited, useEdit] = useState<boolean>(false)
  const [headerTitle, useUpdateText] = useState<string>(headerText || '')
  const [isMenuOpen, useOpenMenu] = useState<boolean>(false)
  const displayText = headerText || translate('enterGameTitle')
  
  const { gamesStore: {updateGameName, createGame} } = useStores()

  const saveInput = () => {
    headerId ? updateGameName(headerId, headerTitle) : createGame(headerTitle)
    useEdit(false)
  }

  return (
    <SafeAreaView style={BAR}>
      <View style={[ROOT, style]}>
        <View style={TITLE_MIDDLE}>
          {isEdited ? <TextField autoFocus style={INPUT} onChangeText={useUpdateText} defaultValue={headerTitle} cancelEditOnBackPress={() => useEdit(false)} saveEditOnEnter={saveInput} />
          : <Button preset="link" onPress={() => useEdit(true)}><Text style={TITLE} text={displayText} preset='header' />
          </Button>}
        </View>
        {isEdited ? <Button preset="confirm" onPress={saveInput} textKey="ok"></Button>
         : <Button preset="primary" onPress={() => useOpenMenu(!isMenuOpen)}>
          <Icon style={ICON} icon={"menu"} />
        </Button>}
      </View>
    </SafeAreaView>
  )
}
