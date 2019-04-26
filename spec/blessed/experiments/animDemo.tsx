import { getContent, text, box, Screen } from '../../../src';
import { waitFor } from '../../../src/blessed/waitFor';
import { animate, bounceEasyOut, back, elastic, bounceEaseInOut } from '../../../src/util/anim';

export async function animDemo(screen: Screen) {
  const parent = box({ parent: screen, top: 0, left: 'center', width: '70%', bg: 'black', border: 'line' });
  const width = 8;
  const g = text({
    parent,
    width,
    height: 2,
    content: 'bounce',
    top: 0, left: 0, bg: 'white',
    fg: 'red'
  });
  const g2 = text({
    parent,
    width,
    height: 2,
    top: 3,
    content: 'back',
    left: 0,
    bg: 'yellow',
    fg: 'black'
  });
  const g3 = text({
    parent,
    width,
    height: 2,
    top: 6,
    content: 'elastic',
    left: 0,
    fg: '#ff88cc',
  });
  const g4 = text({
    parent,
    width,
    height: 2,
    top: 9,
    content: 'bounceInOut',
    left: 0,
    // clickable: true,
    bg: '#00ff00',
    fg: 'black'
  });
  const g5 = text({
    parent,
    // width,
    height: 2,
    top: 12,
    content: 'Nostrud',
    left: 0,
    // clickable: true,
    bg: 'black',
    fg: '#7744ff'
  });
  // g4.on('click', e=>{
  //   g4.left = 0
  //   screen.render()
  //   animate({
  //     duration, timing: bounceEaseInOut(), draw: t=>{
  //       g4.left= Math.trunc(t*90)+'%'// Math.trunc(screen.width/2*t) - 3 + Math.trunc(screen.width/2)
  //       screen.render()
  //     }, lapse: 20
  //   })
  // })
  screen.render();
  await waitFor(() => getContent(g).includes('bounce'));
  const duration = 2000;
  animate({
    duration, timing: bounceEasyOut(), draw: t => {
      g.left = Math.trunc(t * 90) + '%'; //Math.trunc(screen.width/2*t) - 3
      screen.render();
    }, lapse: 20
  });
  setTimeout(() => {
    animate({
      duration, timing: back(), draw: t => {
        g2.left = Math.trunc(t * 90) + '%'; // Math.trunc(screen.width/2*t) - 3 + Math.trunc(screen.width/2)
        screen.render();
      }, lapse: 20
    });
  }, duration);
  setTimeout(() => {
    animate({
      duration, timing: elastic(1.2), draw: t => {
        g3.left = Math.trunc(t * 90) + '%'; // Math.trunc(screen.width/2*t) - 3 + Math.trunc(screen.width/2)
        screen.render();
      }, lapse: 20
    });
  }, duration * 2);
  setTimeout(() => {
    animate({
      duration, timing: bounceEaseInOut(), draw: t => {
        g4.left = Math.trunc(t * 90) + '%'; // Math.trunc(screen.width/2*t) - 3 + Math.trunc(screen.width/2)
        screen.render();
      }, lapse: 20
    });
  }, duration * 3);
  setTimeout(() => {
    const content = 'Nostrud ex dolore dolor in est incididunt proident sunt ullamco. Amet aute quis tempor ut labore aliqua consectetur incididunt nostrud incididunt. Incididunt labore in sunt in et minim nostrud.';
    animate({
      duration: duration * 2, timing: bounceEaseInOut(), draw: t => {
        g5.content = content.substring(0, Math.trunc(content.length * t)); // Math.trunc(screen.width/2*t) - 3 + Math.trunc(screen.width/2)
        screen.render();
      }, lapse: 20
    });
  }, duration * 4);
}
