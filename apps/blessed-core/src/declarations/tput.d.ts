interface TputHeader {
  dataSize: number
  headerSize: number
  magicNumber: boolean
  namesSize: number
  boolCount: number
  numCount: number
  strCount: number
  strTableSize: number
  extended: {
    dataSize: number
    headerSize: number
    boolCount: number
    numCount: number
    strCount: number
    strTableSize: number
    lastStrTableOffset: number
  }
}
interface TputInfo {
  header: TputHeader
  name: string
  names: string[]
  desc: string
  bools: { [c: string]: boolean }
  numbers: { [c: string]: number }
  strings: { [c: string]: string }
  methods: { [c: string]: any }
  dir: string
  file: string
  features: TputFeatures
  all: { [c: string]: any }
}

interface TputFeatures {
  unicode: boolean
  brokenACS: boolean
  PCRomSet: boolean
  magicCookie: boolean
  padding: boolean
  setbuf: boolean
  acsc: { [c: string]: string }
  acscr: { [c: string]: string }
}

interface TputsOptions  {
  terminal?: string
  extended?: boolean
  debug?: boolean
  termcap?: string|boolean
  terminfoFile?: string
  terminfoPrefix?: string
  termcapFile?: string
} 

/**
 * Low level implementation of tput protocol to dialogue with terminal implementations.
 */
export declare class Tput implements   TputFeatures {

  constructor(opts: TputsOptions)

  /**
   * Original options object.
   */
  options: TputsOptions

  extended: boolean
  termcap: boolean
  auto_left_margin: boolean
  auto_right_margin: boolean
  no_esc_ctlc: boolean
  ceol_standout_glitch: boolean
  eat_newline_glitch: boolean
  erase_overstrike: boolean
  generic_type: boolean
  hard_copy: boolean
  has_meta_key: boolean
  has_status_line: boolean
  insert_null_glitch: boolean
  memory_above: boolean
  memory_below: boolean
  move_insert_mode: boolean
  move_standout_mode: boolean
  over_strike: boolean
  status_line_esc_ok: boolean
  dest_tabs_magic_smso: boolean
  tilde_glitch: boolean
  transparent_underline: boolean
  xon_xoff: boolean
  needs_xon_xoff: boolean
  prtr_silent: boolean
  hard_cursor: boolean
  non_rev_rmcup: boolean
  no_pad_char: boolean
  non_dest_scroll_region: boolean
  can_change: boolean
  back_color_erase: boolean
  hue_lightness_saturation: boolean
  col_addr_glitch: boolean
  cr_cancels_micro_mode: boolean
  has_print_wheel: boolean
  row_addr_glitch: boolean
  semi_auto_right_margin: boolean
  cpi_changes_res: boolean
  lpi_changes_res: boolean
  backspaces_with_bs: boolean
  crt_no_scrolling: boolean
  no_correctly_working_cr: boolean
  gnu_has_meta_key: boolean
  linefeed_is_newline: boolean
  has_hardware_tabs: boolean
  return_does_clr_eol: boolean
  bw: boolean
  am: boolean
  xsb: boolean
  beehive_glitch: boolean
  xhp: boolean
  xenl: boolean
  eo: boolean
  gn: boolean
  hc: boolean
  km: boolean
  hs: boolean
  in: boolean
  // da: boolean
  db: boolean
  mir: boolean
  msgr: boolean
  os: boolean
  eslok: boolean
  xt: boolean
  teleray_glitch: boolean
  hz: boolean
  ul: boolean
  xon: boolean
  nxon: boolean
  mc5i: boolean
  chts: boolean
  nrrmc: boolean
  npc: boolean
  ndscr: boolean
  ccc: boolean
  bce: boolean
  hls: boolean
  xhpa: boolean
  crxm: boolean
  daisy: boolean
  xvpa: boolean
  sam: boolean
  cpix: boolean
  lpix: boolean
  unicode: boolean
  brokenACS: boolean
  PCRomSet: boolean
  magicCookie: boolean
  setbuf: boolean


  terminal: string



  acsc: { [c: string]: string; };
  acscr: { [c: string]: string; };


  columns: number
  init_tabs: number
  lines: number
  lines_of_memory: number
  magic_cookie_glitch: number
  padding_baud_rate: number
  virtual_terminal: number
  width_status_line: number
  num_labels: number
  label_height: number
  label_width: number
  max_attributes: number
  maximum_windows: number
  max_colors: number
  max_pairs: number
  kNXT6: number
  kNXT7: number
  no_color_video: number
  buffer_capacity: number
  dot_vert_spacing: number
  dot_horz_spacing: number
  max_micro_address: number
  max_micro_jump: number
  micro_col_size: number
  micro_line_size: number
  number_of_pins: number
  output_res_char: number
  output_res_line: number
  output_res_horz_inch: number
  output_res_vert_inch: number
  print_rate: number
  wide_char_size: number
  buttons: number
  bit_image_entwining: number
  bit_image_type: number
  magic_cookie_glitch_ul: number
  carriage_return_delay: number
  new_line_delay: number
  backspace_delay: number
  horizontal_tab_delay: number
  number_of_function_keys: number
  cols: number
  it: number
  lm: number
  xmc: number
  pb: number
  vt: number
  wsl: number
  nlab: number
  lh: number
  lw: number
  ma: number
  wnum: number
  colors: number
  pairs: number
  ncv: number
  bufsz: number
  spinv: number
  spinh: number
  maddr: number
  mjump: number
  mcs: number
  micro_char_size: number
  mls: number
  npins: number
  orc: number
  orl: number
  orhi: number
  orvi: number
  cps: number
  widcs: number
  btns: number
  bitwin: number
  bitype: number

  info: TputInfo
  all: { [cap: string]: any }
  methods: { [cap: string]: any }
  bools: { [cap: string]: any }
  numbers: { [cap: string]: any }
  strings: { [cap: string]: any }
  features: TputFeatures



  // debug: boolean
  padding: boolean
  printf: boolean
  terminfoPrefix: string
  terminfoFile: string
  termcapFile: string
  error: Error

  setup(): void
  term(is: any): boolean
  readTerminfo(term: string): string
  parseTerminfo(
    data: any,
    file: string
  ): TputInfo


  back_tab(...args: any[]): any
  bell(...args: any[]): any
  carriage_return(...args: any[]): any
  change_scroll_region(...args: any[]): any
  clear_all_tabs(...args: any[]): any
  clear_screen(...args: any[]): any
  clr_eol(...args: any[]): any
  clr_eos(...args: any[]): any
  column_address(...args: any[]): any
  cursor_address(...args: any[]): any
  cursor_down(...args: any[]): any
  cursor_home(...args: any[]): any
  cursor_invisible(...args: any[]): any
  cursor_left(...args: any[]): any
  cursor_normal(...args: any[]): any
  cursor_right(...args: any[]): any
  cursor_up(...args: any[]): any
  cursor_visible(...args: any[]): any
  delete_character(...args: any[]): any
  delete_line(...args: any[]): any
  enter_alt_charset_mode(...args: any[]): any
  enter_blink_mode(...args: any[]): any
  enter_bold_mode(...args: any[]): any
  enter_ca_mode(...args: any[]): any
  enter_insert_mode(...args: any[]): any
  enter_secure_mode(...args: any[]): any
  enter_reverse_mode(...args: any[]): any
  enter_standout_mode(...args: any[]): any
  enter_underline_mode(...args: any[]): any
  erase_chars(...args: any[]): any
  exit_alt_charset_mode(...args: any[]): any
  exit_attribute_mode(...args: any[]): any
  exit_ca_mode(...args: any[]): any
  exit_insert_mode(...args: any[]): any
  exit_standout_mode(...args: any[]): any
  exit_underline_mode(...args: any[]): any
  flash_screen(...args: any[]): any
  init_2string(...args: any[]): any
  insert_line(...args: any[]): any
  key_backspace(...args: any[]): any
  key_dc(...args: any[]): any
  key_down(...args: any[]): any
  key_f1(...args: any[]): any
  key_f10(...args: any[]): any
  key_f2(...args: any[]): any
  key_f3(...args: any[]): any
  key_f4(...args: any[]): any
  key_f5(...args: any[]): any
  key_f6(...args: any[]): any
  key_f7(...args: any[]): any
  key_f8(...args: any[]): any
  key_f9(...args: any[]): any
  key_home(...args: any[]): any
  key_ic(...args: any[]): any
  key_left(...args: any[]): any
  key_npage(...args: any[]): any
  key_ppage(...args: any[]): any
  key_right(...args: any[]): any
  key_sf(...args: any[]): any
  key_sr(...args: any[]): any
  key_up(...args: any[]): any
  keypad_local(...args: any[]): any
  keypad_xmit(...args: any[]): any
  meta_off(...args: any[]): any
  meta_on(...args: any[]): any
  parm_dch(...args: any[]): any
  parm_delete_line(...args: any[]): any
  parm_down_cursor(...args: any[]): any
  parm_ich(...args: any[]): any
  parm_index(...args: any[]): any
  parm_insert_line(...args: any[]): any
  parm_left_cursor(...args: any[]): any
  parm_right_cursor(...args: any[]): any
  parm_rindex(...args: any[]): any
  parm_up_cursor(...args: any[]): any
  print_screen(...args: any[]): any
  prtr_off(...args: any[]): any
  prtr_on(...args: any[]): any
  reset_1string(...args: any[]): any
  reset_2string(...args: any[]): any
  restore_cursor(...args: any[]): any
  row_address(...args: any[]): any
  save_cursor(...args: any[]): any
  scroll_forward(...args: any[]): any
  scroll_reverse(...args: any[]): any
  set_attributes(...args: any[]): any
  set_tab(...args: any[]): any
  tab(...args: any[]): any
  key_b2(...args: any[]): any
  acs_chars(...args: any[]): any
  key_btab(...args: any[]): any
  enter_am_mode(...args: any[]): any
  exit_am_mode(...args: any[]): any
  key_end(...args: any[]): any
  key_enter(...args: any[]): any
  key_sdc(...args: any[]): any
  key_send(...args: any[]): any
  key_shome(...args: any[]): any
  key_sic(...args: any[]): any
  key_sleft(...args: any[]): any
  key_snext(...args: any[]): any
  key_sprevious(...args: any[]): any
  key_sright(...args: any[]): any
  key_f11(...args: any[]): any
  key_f12(...args: any[]): any
  key_f13(...args: any[]): any
  key_f14(...args: any[]): any
  key_f15(...args: any[]): any
  key_f16(...args: any[]): any
  key_f17(...args: any[]): any
  key_f18(...args: any[]): any
  key_f19(...args: any[]): any
  key_f20(...args: any[]): any
  key_f21(...args: any[]): any
  key_f22(...args: any[]): any
  key_f23(...args: any[]): any
  key_f24(...args: any[]): any
  key_f25(...args: any[]): any
  key_f26(...args: any[]): any
  key_f27(...args: any[]): any
  key_f28(...args: any[]): any
  key_f29(...args: any[]): any
  key_f30(...args: any[]): any
  key_f31(...args: any[]): any
  key_f32(...args: any[]): any
  key_f33(...args: any[]): any
  key_f34(...args: any[]): any
  key_f35(...args: any[]): any
  key_f36(...args: any[]): any
  key_f37(...args: any[]): any
  key_f38(...args: any[]): any
  key_f39(...args: any[]): any
  key_f40(...args: any[]): any
  key_f41(...args: any[]): any
  key_f42(...args: any[]): any
  key_f43(...args: any[]): any
  key_f44(...args: any[]): any
  key_f45(...args: any[]): any
  key_f46(...args: any[]): any
  key_f47(...args: any[]): any
  key_f48(...args: any[]): any
  key_f49(...args: any[]): any
  key_f50(...args: any[]): any
  key_f51(...args: any[]): any
  key_f52(...args: any[]): any
  key_f53(...args: any[]): any
  key_f54(...args: any[]): any
  key_f55(...args: any[]): any
  key_f56(...args: any[]): any
  key_f57(...args: any[]): any
  key_f58(...args: any[]): any
  key_f59(...args: any[]): any
  key_f60(...args: any[]): any
  key_f61(...args: any[]): any
  key_f62(...args: any[]): any
  key_f63(...args: any[]): any
  clr_bol(...args: any[]): any
  user6(...args: any[]): any
  user7(...args: any[]): any
  user8(...args: any[]): any
  user9(...args: any[]): any
  orig_pair(...args: any[]): any
  initialize_color(...args: any[]): any
  key_mouse(...args: any[]): any
  set_a_foreground(...args: any[]): any
  set_a_background(...args: any[]): any
  memory_lock(...args: any[]): any
  memory_unlock(...args: any[]): any
  command_character(...args: any[]): any
  cursor_mem_address(...args: any[]): any
  cursor_to_ll(...args: any[]): any
  dis_status_line(...args: any[]): any
  down_half_line(...args: any[]): any
  enter_delete_mode(...args: any[]): any
  enter_dim_mode(...args: any[]): any
  enter_protected_mode(...args: any[]): any
  exit_delete_mode(...args: any[]): any
  form_feed(...args: any[]): any
  from_status_line(...args: any[]): any
  init_1string(...args: any[]): any
  init_3string(...args: any[]): any
  init_file(...args: any[]): any
  insert_character(...args: any[]): any
  insert_padding(...args: any[]): any
  key_catab(...args: any[]): any
  key_clear(...args: any[]): any
  key_ctab(...args: any[]): any
  key_dl(...args: any[]): any
  key_eic(...args: any[]): any
  key_eol(...args: any[]): any
  key_eos(...args: any[]): any
  key_f0(...args: any[]): any
  key_il(...args: any[]): any
  key_ll(...args: any[]): any
  key_stab(...args: any[]): any
  lab_f0(...args: any[]): any
  lab_f1(...args: any[]): any
  lab_f10(...args: any[]): any
  lab_f2(...args: any[]): any
  lab_f3(...args: any[]): any
  lab_f4(...args: any[]): any
  lab_f5(...args: any[]): any
  lab_f6(...args: any[]): any
  lab_f7(...args: any[]): any
  lab_f8(...args: any[]): any
  lab_f9(...args: any[]): any
  newline(...args: any[]): any
  pad_char(...args: any[]): any
  pkey_key(...args: any[]): any
  pkey_local(...args: any[]): any
  pkey_xmit(...args: any[]): any
  repeat_char(...args: any[]): any
  reset_3string(...args: any[]): any
  reset_file(...args: any[]): any
  set_window(...args: any[]): any
  to_status_line(...args: any[]): any
  underline_char(...args: any[]): any
  up_half_line(...args: any[]): any
  init_prog(...args: any[]): any
  key_a1(...args: any[]): any
  key_a3(...args: any[]): any
  key_c1(...args: any[]): any
  key_c3(...args: any[]): any
  prtr_non(...args: any[]): any
  char_padding(...args: any[]): any
  plab_norm(...args: any[]): any
  enter_xon_mode(...args: any[]): any
  exit_xon_mode(...args: any[]): any
  xon_character(...args: any[]): any
  xoff_character(...args: any[]): any
  ena_acs(...args: any[]): any
  label_on(...args: any[]): any
  label_off(...args: any[]): any
  key_beg(...args: any[]): any
  key_cancel(...args: any[]): any
  key_close(...args: any[]): any
  key_command(...args: any[]): any
  key_copy(...args: any[]): any
  key_create(...args: any[]): any
  key_exit(...args: any[]): any
  key_find(...args: any[]): any
  key_help(...args: any[]): any
  key_mark(...args: any[]): any
  key_message(...args: any[]): any
  key_move(...args: any[]): any
  key_next(...args: any[]): any
  key_open(...args: any[]): any
  key_options(...args: any[]): any
  key_previous(...args: any[]): any
  key_print(...args: any[]): any
  key_redo(...args: any[]): any
  key_reference(...args: any[]): any
  key_refresh(...args: any[]): any
  key_replace(...args: any[]): any
  key_restart(...args: any[]): any
  key_resume(...args: any[]): any
  key_save(...args: any[]): any
  key_suspend(...args: any[]): any
  key_undo(...args: any[]): any
  key_sbeg(...args: any[]): any
  key_scancel(...args: any[]): any
  key_scommand(...args: any[]): any
  key_scopy(...args: any[]): any
  key_screate(...args: any[]): any
  key_sdl(...args: any[]): any
  key_select(...args: any[]): any
  key_seol(...args: any[]): any
  key_sexit(...args: any[]): any
  key_sfind(...args: any[]): any
  key_shelp(...args: any[]): any
  key_smessage(...args: any[]): any
  key_smove(...args: any[]): any
  key_soptions(...args: any[]): any
  key_sprint(...args: any[]): any
  key_sredo(...args: any[]): any
  key_sreplace(...args: any[]): any
  key_srsume(...args: any[]): any
  key_ssave(...args: any[]): any
  key_ssuspend(...args: any[]): any
  key_sundo(...args: any[]): any
  req_for_input(...args: any[]): any
  clear_margins(...args: any[]): any
  set_left_margin(...args: any[]): any
  set_right_margin(...args: any[]): any
  label_format(...args: any[]): any
  set_clock(...args: any[]): any
  display_clock(...args: any[]): any
  remove_clock(...args: any[]): any
  create_window(...args: any[]): any
  goto_window(...args: any[]): any
  hangup(...args: any[]): any
  dial_phone(...args: any[]): any
  quick_dial(...args: any[]): any
  tone(...args: any[]): any
  pulse(...args: any[]): any
  flash_hook(...args: any[]): any
  fixed_pause(...args: any[]): any
  wait_tone(...args: any[]): any
  user0(...args: any[]): any
  user1(...args: any[]): any
  user2(...args: any[]): any
  user3(...args: any[]): any
  user4(...args: any[]): any
  user5(...args: any[]): any
  orig_colors(...args: any[]): any
  initialize_pair(...args: any[]): any
  set_color_pair(...args: any[]): any
  set_foreground(...args: any[]): any
  set_background(...args: any[]): any
  change_char_pitch(...args: any[]): any
  change_line_pitch(...args: any[]): any
  change_res_horz(...args: any[]): any
  change_res_vert(...args: any[]): any
  define_char(...args: any[]): any
  enter_doublewide_mode(...args: any[]): any
  enter_draft_quality(...args: any[]): any
  enter_italics_mode(...args: any[]): any
  enter_leftward_mode(...args: any[]): any
  enter_micro_mode(...args: any[]): any
  enter_near_letter_quality(...args: any[]): any
  enter_normal_quality(...args: any[]): any
  enter_shadow_mode(...args: any[]): any
  enter_subscript_mode(...args: any[]): any
  enter_superscript_mode(...args: any[]): any
  enter_upward_mode(...args: any[]): any
  exit_doublewide_mode(...args: any[]): any
  exit_italics_mode(...args: any[]): any
  exit_leftward_mode(...args: any[]): any
  exit_micro_mode(...args: any[]): any
  exit_shadow_mode(...args: any[]): any
  exit_subscript_mode(...args: any[]): any
  exit_superscript_mode(...args: any[]): any
  exit_upward_mode(...args: any[]): any
  micro_column_address(...args: any[]): any
  micro_down(...args: any[]): any
  micro_left(...args: any[]): any
  micro_right(...args: any[]): any
  micro_row_address(...args: any[]): any
  micro_up(...args: any[]): any
  order_of_pins(...args: any[]): any
  parm_down_micro(...args: any[]): any
  parm_left_micro(...args: any[]): any
  parm_right_micro(...args: any[]): any
  parm_up_micro(...args: any[]): any
  select_char_set(...args: any[]): any
  set_bottom_margin(...args: any[]): any
  set_bottom_margin_parm(...args: any[]): any
  set_left_margin_parm(...args: any[]): any
  set_right_margin_parm(...args: any[]): any
  set_top_margin(...args: any[]): any
  set_top_margin_parm(...args: any[]): any
  start_bit_image(...args: any[]): any
  start_char_set_def(...args: any[]): any
  stop_bit_image(...args: any[]): any
  stop_char_set_def(...args: any[]): any
  subscript_characters(...args: any[]): any
  superscript_characters(...args: any[]): any
  these_cause_cr(...args: any[]): any
  zero_motion(...args: any[]): any
  char_set_names(...args: any[]): any
  mouse_info(...args: any[]): any
  req_mouse_pos(...args: any[]): any
  get_mouse(...args: any[]): any
  pkey_plab(...args: any[]): any
  device_type(...args: any[]): any
  code_set_init(...args: any[]): any
  set0_des_seq(...args: any[]): any
  set1_des_seq(...args: any[]): any
  set2_des_seq(...args: any[]): any
  set3_des_seq(...args: any[]): any
  set_lr_margin(...args: any[]): any
  set_tb_margin(...args: any[]): any
  bit_image_repeat(...args: any[]): any
  bit_image_newline(...args: any[]): any
  bit_image_carriage_return(...args: any[]): any
  color_names(...args: any[]): any
  define_bit_image_region(...args: any[]): any
  end_bit_image_region(...args: any[]): any
  set_color_band(...args: any[]): any
  set_page_length(...args: any[]): any
  display_pc_char(...args: any[]): any
  enter_pc_charset_mode(...args: any[]): any
  exit_pc_charset_mode(...args: any[]): any
  enter_scancode_mode(...args: any[]): any
  exit_scancode_mode(...args: any[]): any
  pc_term_options(...args: any[]): any
  scancode_escape(...args: any[]): any
  alt_scancode_esc(...args: any[]): any
  enter_horizontal_hl_mode(...args: any[]): any
  enter_left_hl_mode(...args: any[]): any
  enter_low_hl_mode(...args: any[]): any
  enter_right_hl_mode(...args: any[]): any
  enter_top_hl_mode(...args: any[]): any
  enter_vertical_hl_mode(...args: any[]): any
  set_a_attributes(...args: any[]): any
  set_pglen_inch(...args: any[]): any
  termcap_init2(...args: any[]): any
  termcap_reset(...args: any[]): any
  linefeed_if_not_lf(...args: any[]): any
  backspace_if_not_bs(...args: any[]): any
  other_non_function_keys(...args: any[]): any
  arrow_key_map(...args: any[]): any
  acs_ulcorner(...args: any[]): any
  acs_llcorner(...args: any[]): any
  acs_urcorner(...args: any[]): any
  acs_lrcorner(...args: any[]): any
  acs_ltee(...args: any[]): any
  acs_rtee(...args: any[]): any
  acs_btee(...args: any[]): any
  acs_ttee(...args: any[]): any
  acs_hline(...args: any[]): any
  acs_vline(...args: any[]): any
  acs_plus(...args: any[]): any
  box_chars_1(...args: any[]): any
  cbt(...args: any[]): any
  bel(...args: any[]): any
  cr(...args: any[]): any
  csr(...args: any[]): any
  tbc(...args: any[]): any
  clear(...args: any[]): any
  el(...args: any[]): any
  ed(...args: any[]): any
  hpa(...args: any[]): any
  cup(...args: any[]): any
  cud1(...args: any[]): any
  home(...args: any[]): any
  civis(...args: any[]): any
  cub1(...args: any[]): any
  cnorm(...args: any[]): any
  cuf1(...args: any[]): any
  cuu1(...args: any[]): any
  cvvis(...args: any[]): any
  dch1(...args: any[]): any
  dl1(...args: any[]): any
  smacs(...args: any[]): any
  blink(...args: any[]): any
  bold(...args: any[]): any
  smcup(...args: any[]): any
  smir(...args: any[]): any
  invis(...args: any[]): any
  rev(...args: any[]): any
  smso(...args: any[]): any
  smul(...args: any[]): any
  ech(...args: any[]): any
  rmacs(...args: any[]): any
  sgr0(...args: any[]): any
  rmcup(...args: any[]): any
  rmir(...args: any[]): any
  rmso(...args: any[]): any
  rmul(...args: any[]): any
  flash(...args: any[]): any
  is2(...args: any[]): any
  il1(...args: any[]): any
  kbs(...args: any[]): any
  kdch1(...args: any[]): any
  kcud1(...args: any[]): any
  kf1(...args: any[]): any
  kf10(...args: any[]): any
  kf2(...args: any[]): any
  kf3(...args: any[]): any
  kf4(...args: any[]): any
  kf5(...args: any[]): any
  kf6(...args: any[]): any
  kf7(...args: any[]): any
  kf8(...args: any[]): any
  kf9(...args: any[]): any
  khome(...args: any[]): any
  kich1(...args: any[]): any
  kcub1(...args: any[]): any
  knp(...args: any[]): any
  kpp(...args: any[]): any
  kcuf1(...args: any[]): any
  kind(...args: any[]): any
  kri(...args: any[]): any
  kcuu1(...args: any[]): any
  rmkx(...args: any[]): any
  smkx(...args: any[]): any
  rmm(...args: any[]): any
  smm(...args: any[]): any
  dch(...args: any[]): any
  dl(...args: any[]): any
  cud(...args: any[]): any
  ich(...args: any[]): any
  indn(...args: any[]): any
  il(...args: any[]): any
  cub(...args: any[]): any
  cuf(...args: any[]): any
  rin(...args: any[]): any
  cuu(...args: any[]): any
  mc0(...args: any[]): any
  mc4(...args: any[]): any
  mc5(...args: any[]): any
  rs1(...args: any[]): any
  rs2(...args: any[]): any
  rc(...args: any[]): any
  vpa(...args: any[]): any
  sc(...args: any[]): any
  ind(...args: any[]): any
  ri(...args: any[]): any
  sgr(...args: any[]): any
  hts(...args: any[]): any
  ht(...args: any[]): any
  kb2(...args: any[]): any
  kcbt(...args: any[]): any
  smam(...args: any[]): any
  rmam(...args: any[]): any
  kend(...args: any[]): any
  kent(...args: any[]): any
  kDC(...args: any[]): any
  kEND(...args: any[]): any
  kHOM(...args: any[]): any
  kIC(...args: any[]): any
  kLFT(...args: any[]): any
  kNXT(...args: any[]): any
  kPRV(...args: any[]): any
  kRIT(...args: any[]): any
  kf11(...args: any[]): any
  kf12(...args: any[]): any
  kf13(...args: any[]): any
  kf14(...args: any[]): any
  kf15(...args: any[]): any
  kf16(...args: any[]): any
  kf17(...args: any[]): any
  kf18(...args: any[]): any
  kf19(...args: any[]): any
  kf20(...args: any[]): any
  kf21(...args: any[]): any
  kf22(...args: any[]): any
  kf23(...args: any[]): any
  kf24(...args: any[]): any
  kf25(...args: any[]): any
  kf26(...args: any[]): any
  kf27(...args: any[]): any
  kf28(...args: any[]): any
  kf29(...args: any[]): any
  kf30(...args: any[]): any
  kf31(...args: any[]): any
  kf32(...args: any[]): any
  kf33(...args: any[]): any
  kf34(...args: any[]): any
  kf35(...args: any[]): any
  kf36(...args: any[]): any
  kf37(...args: any[]): any
  kf38(...args: any[]): any
  kf39(...args: any[]): any
  kf40(...args: any[]): any
  kf41(...args: any[]): any
  kf42(...args: any[]): any
  kf43(...args: any[]): any
  kf44(...args: any[]): any
  kf45(...args: any[]): any
  kf46(...args: any[]): any
  kf47(...args: any[]): any
  kf48(...args: any[]): any
  kf49(...args: any[]): any
  kf50(...args: any[]): any
  kf51(...args: any[]): any
  kf52(...args: any[]): any
  kf53(...args: any[]): any
  kf54(...args: any[]): any
  kf55(...args: any[]): any
  kf56(...args: any[]): any
  kf57(...args: any[]): any
  kf58(...args: any[]): any
  kf59(...args: any[]): any
  kf60(...args: any[]): any
  kf61(...args: any[]): any
  kf62(...args: any[]): any
  kf63(...args: any[]): any
  el1(...args: any[]): any
  u6(...args: any[]): any
  u7(...args: any[]): any
  u8(...args: any[]): any
  u9(...args: any[]): any
  op(...args: any[]): any
  initc(...args: any[]): any
  kmous(...args: any[]): any
  setaf(...args: any[]): any
  setab(...args: any[]): any
  cmdch(...args: any[]): any
  mrcup(...args: any[]): any
  ll(...args: any[]): any
  dsl(...args: any[]): any
  hd(...args: any[]): any
  smdc(...args: any[]): any
  dim(...args: any[]): any
  prot(...args: any[]): any
  rmdc(...args: any[]): any
  ff(...args: any[]): any
  fsl(...args: any[]): any
  is1(...args: any[]): any
  is3(...args: any[]): any
  if(...args: any[]): any
  ich1(...args: any[]): any
  ip(...args: any[]): any
  ktbc(...args: any[]): any
  kclr(...args: any[]): any
  kctab(...args: any[]): any
  kdl1(...args: any[]): any
  krmir(...args: any[]): any
  kel(...args: any[]): any
  ked(...args: any[]): any
  kf0(...args: any[]): any
  kil1(...args: any[]): any
  kll(...args: any[]): any
  khts(...args: any[]): any
  lf0(...args: any[]): any
  lf1(...args: any[]): any
  lf10(...args: any[]): any
  lf2(...args: any[]): any
  lf3(...args: any[]): any
  lf4(...args: any[]): any
  lf5(...args: any[]): any
  lf6(...args: any[]): any
  lf7(...args: any[]): any
  lf8(...args: any[]): any
  lf9(...args: any[]): any
  nel(...args: any[]): any
  pad(...args: any[]): any
  pfkey(...args: any[]): any
  pfloc(...args: any[]): any
  pfx(...args: any[]): any
  rep(...args: any[]): any
  rs3(...args: any[]): any
  rf(...args: any[]): any
  wind(...args: any[]): any
  tsl(...args: any[]): any
  uc(...args: any[]): any
  hu(...args: any[]): any
  iprog(...args: any[]): any
  ka1(...args: any[]): any
  ka3(...args: any[]): any
  kc1(...args: any[]): any
  kc3(...args: any[]): any
  mc5p(...args: any[]): any
  rmp(...args: any[]): any
  pln(...args: any[]): any
  smxon(...args: any[]): any
  rmxon(...args: any[]): any
  xonc(...args: any[]): any
  xoffc(...args: any[]): any
  enacs(...args: any[]): any
  smln(...args: any[]): any
  rmln(...args: any[]): any
  kbeg(...args: any[]): any
  kcan(...args: any[]): any
  kclo(...args: any[]): any
  kcmd(...args: any[]): any
  kcpy(...args: any[]): any
  kcrt(...args: any[]): any
  kext(...args: any[]): any
  kfnd(...args: any[]): any
  khlp(...args: any[]): any
  kmrk(...args: any[]): any
  kmsg(...args: any[]): any
  kmov(...args: any[]): any
  knxt(...args: any[]): any
  kopn(...args: any[]): any
  kopt(...args: any[]): any
  kprv(...args: any[]): any
  kprt(...args: any[]): any
  krdo(...args: any[]): any
  kref(...args: any[]): any
  krfr(...args: any[]): any
  krpl(...args: any[]): any
  krst(...args: any[]): any
  kres(...args: any[]): any
  ksav(...args: any[]): any
  kspd(...args: any[]): any
  kund(...args: any[]): any
  kBEG(...args: any[]): any
  kCAN(...args: any[]): any
  kCMD(...args: any[]): any
  kCPY(...args: any[]): any
  kCRT(...args: any[]): any
  kDL(...args: any[]): any
  kslt(...args: any[]): any
  kEOL(...args: any[]): any
  kEXT(...args: any[]): any
  kFND(...args: any[]): any
  kHLP(...args: any[]): any
  kMSG(...args: any[]): any
  kMOV(...args: any[]): any
  kOPT(...args: any[]): any
  kPRT(...args: any[]): any
  kRDO(...args: any[]): any
  kRPL(...args: any[]): any
  kRES(...args: any[]): any
  kSAV(...args: any[]): any
  kSPD(...args: any[]): any
  kUND(...args: any[]): any
  rfi(...args: any[]): any
  mgc(...args: any[]): any
  smgl(...args: any[]): any
  smgr(...args: any[]): any
  fln(...args: any[]): any
  sclk(...args: any[]): any
  dclk(...args: any[]): any
  rmclk(...args: any[]): any
  cwin(...args: any[]): any
  wingo(...args: any[]): any
  hup(...args: any[]): any
  dial(...args: any[]): any
  qdial(...args: any[]): any
  hook(...args: any[]): any
  pause(...args: any[]): any
  wait(...args: any[]): any
  u0(...args: any[]): any
  u1(...args: any[]): any
  u2(...args: any[]): any
  u3(...args: any[]): any
  u4(...args: any[]): any
  u5(...args: any[]): any
  oc(...args: any[]): any
  initp(...args: any[]): any
  scp(...args: any[]): any
  setf(...args: any[]): any
  setb(...args: any[]): any
  cpi(...args: any[]): any
  lpi(...args: any[]): any
  chr(...args: any[]): any
  cvr(...args: any[]): any
  defc(...args: any[]): any
  swidm(...args: any[]): any
  sdrfq(...args: any[]): any
  sitm(...args: any[]): any
  slm(...args: any[]): any
  smicm(...args: any[]): any
  snlq(...args: any[]): any
  snrmq(...args: any[]): any
  sshm(...args: any[]): any
  ssubm(...args: any[]): any
  ssupm(...args: any[]): any
  sum(...args: any[]): any
  rwidm(...args: any[]): any
  ritm(...args: any[]): any
  rlm(...args: any[]): any
  rmicm(...args: any[]): any
  rshm(...args: any[]): any
  rsubm(...args: any[]): any
  rsupm(...args: any[]): any
  rum(...args: any[]): any
  mhpa(...args: any[]): any
  mcud1(...args: any[]): any
  mcub1(...args: any[]): any
  mcuf1(...args: any[]): any
  mvpa(...args: any[]): any
  mcuu1(...args: any[]): any
  porder(...args: any[]): any
  mcud(...args: any[]): any
  mcub(...args: any[]): any
  mcuf(...args: any[]): any
  mcuu(...args: any[]): any
  scs(...args: any[]): any
  smgb(...args: any[]): any
  smgbp(...args: any[]): any
  smglp(...args: any[]): any
  smgrp(...args: any[]): any
  smgt(...args: any[]): any
  smgtp(...args: any[]): any
  sbim(...args: any[]): any
  scsd(...args: any[]): any
  rbim(...args: any[]): any
  rcsd(...args: any[]): any
  subcs(...args: any[]): any
  supcs(...args: any[]): any
  docr(...args: any[]): any
  zerom(...args: any[]): any
  csnm(...args: any[]): any
  minfo(...args: any[]): any
  reqmp(...args: any[]): any
  getm(...args: any[]): any
  pfxl(...args: any[]): any
  devt(...args: any[]): any
  csin(...args: any[]): any
  s0ds(...args: any[]): any
  s1ds(...args: any[]): any
  s2ds(...args: any[]): any
  s3ds(...args: any[]): any
  smglr(...args: any[]): any
  smgtb(...args: any[]): any
  birep(...args: any[]): any
  binel(...args: any[]): any
  bicr(...args: any[]): any
  colornm(...args: any[]): any
  defbi(...args: any[]): any
  endbi(...args: any[]): any
  setcolor(...args: any[]): any
  slines(...args: any[]): any
  dispc(...args: any[]): any
  smpch(...args: any[]): any
  rmpch(...args: any[]): any
  smsc(...args: any[]): any
  rmsc(...args: any[]): any
  pctrm(...args: any[]): any
  scesc(...args: any[]): any
  scesa(...args: any[]): any
  ehhlm(...args: any[]): any
  elhlm(...args: any[]): any
  elohlm(...args: any[]): any
  erhlm(...args: any[]): any
  ethlm(...args: any[]): any
  evhlm(...args: any[]): any
  sgr1(...args: any[]): any
  slength(...args: any[]): any




}


