# editar

 * a CLI text editor research
 * based on accursed, blessed, redux and editor-widget.
 * no affiliation with slap editor
 * WIP

# Objectives:

 * support TS projects:
  * ts ans tsx syntax highlight
 * language service ? 

# doubts: 

 * how to maintain opened documents ? associate each file with a widget editor instance ? or reuse the same widget editor instance and uptdate it ? I will do as slap - one edityor widget per focument. I guess is better experience, but I wonder about memory.