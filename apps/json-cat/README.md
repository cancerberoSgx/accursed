notes: how to simulate slow json loading


mkfifo jsonStream
ts-node src/cliMain.ts --input jsonStream

in other terminal:
cat package-lock.json | brake 55000 > jsonStream

the viewer should react