// Fallback for using MaterialIcons on Android and web.
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconLibrary = 'FontAwesome' | 'MaterialIcons' | 'Ionicons' | 'FontAwesome5' | 'Font6';

interface IconSymbolProps {
  lib?: IconLibrary;
  name: string;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}

export function IconSymbol({
  lib = 'FontAwesome',
  name,
  size = 24,
  color = 'black',
  style,
}: IconSymbolProps) {
  switch (lib) {
    case 'MaterialIcons':
      return <MaterialIcons name={name as any} size={size} color={color} style={style} />;
    case 'Font6':
      return <FontAwesome6 name={name as any} size={size} color={color} style={style} />;
    case 'Ionicons':
      return <Ionicons name={name as any} size={size} color={color} style={style} />;
    case 'FontAwesome':
      return <FontAwesome name={name as any} size={size} color={color} style={style} />;
    default:
      return <FontAwesome5 name={name as any} size={size} color={color} style={style} />;
  }
}