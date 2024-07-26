const categories = [
    {
        id: 'guitars',
        text: 'Guitars',
        children: [
            { id: 'acousticGuitars', text: 'Acoustic Guitars' },
            { id: 'electricGuitars', text: 'Electric Guitars' },
            { id: 'bassGuitars', text: 'Bass Guitars' },
            {
                id: 'guitarPartsAccessories',
                text: 'Guitar Parts and Accessories',
                children: [
                    { id: 'guitarStrings', text: 'Strings' },
                    { id: 'guitarPickups', text: 'Pickups' },
                    { id: 'guitarParts', text: 'Parts' },
                ],
            },
        ],
    },
    {
        id: 'keyboardsSynths',
        text: 'Keyboards and Synths',
        children: [
            {
                id: 'keyboards',
                text: 'Keyboards',
                children: [
                    { id: 'acousticPianos', text: 'Acoustic Pianos' },
                    { id: 'digitalPianos', text: 'Digital Pianos' },
                    { id: 'electricPianos', text: 'Electric Pianos' },
                    { id: 'workstationKeyboards', text: 'Workstation Keyboards' },
                    { id: 'organs', text: 'Organs' },
                    { id: 'midiControllers', text: 'MIDI Controllers' },
                ],
            },
            {
                id: 'synths',
                text: 'Synths',
                children: [
                    { id: 'analogSynths', text: 'Analog Synths' },
                    { id: 'digitalSynths', text: 'Digital Synths' },
                    { id: 'modularSynths', text: 'Modular Synths' },
                ],
            },
            {
                id: 'miscKeysSynths',
                text: 'Miscellaneous',
                children: [
                    { id: 'samplers', text: 'Samplers' },
                    { id: 'softwareKeysSynths', text: 'Software' },
                ],
            },
        ],
    },
    {
        id: 'drumsPercussion',
        text: 'Drums and Percussion',
        children: [
            {
                id: 'acousticDrums',
                text: 'Acoustic Drums',
                children: [
                    { id: 'acousticKits', text: 'Full Kits' },
                    { id: 'acousticKitSnareDrums', text: 'Snare Drums' },
                    { id: 'acousticKitBassDrums', text: 'Bass Drums' },
                ],
            },
            {
                id: 'electronicDrums',
                text: 'Electronic Drums',
                children: [
                    { id: 'electronicKits', text: 'Electronic Kits' },
                    { id: 'electronicKitModules', text: 'Modules' },
                    { id: 'drumMachines', text: 'Drum Machines' },
                ],
            },
            {
                id: 'cymbals',
                text: 'Cymbals',
                children: [
                    { id: 'hihatCymbals', text: 'Hi-hats' },
                    { id: 'rideCymbals', text: 'Rides' },
                    { id: 'crashCymbals', text: 'Crashes' },
                    { id: 'splashCymbals', text: 'Splashes' },
                ],
            },
            { id: 'auxiliaryPercussion', text: 'Auxiliary Percussion' },
            {
                id: 'concertPercussion',
                text: 'Concert Percussion',
                // children: [
                //
                // ],
            },
            { id: 'malletPercussion', text: 'Mallet Percussion' },
            { id: 'drumPartsAccessories', text: 'Drum Parts and Accessories' },
        ],
    },
    {
        id: 'pedalsAmplifiers',
        text: 'Pedals and Amplifiers',
        children: [
            {
                id: 'effectsPedals',
                text: 'Effects and Pedals',
                children: [
                    { id: 'effectsBoost', text: 'Boost' },
                    { id: 'effectsOverdrive', text: 'Overdrive' },
                    { id: 'effectsDistortion', text: 'Distortion' },
                    { id: 'effectsFuzz', text: 'Fuzz' },
                    { id: 'effectsCompressor', text: 'Compressor' },
                    { id: 'effectsDelay', text: 'Delay' },
                    { id: 'effectsReverb', text: 'Reverb' },
                    { id: 'effectsTremolo', text: 'Tremolo' },
                    { id: 'effectsChorus', text: 'Chorus' },
                    { id: 'effectsVibrato', text: 'Vibrato' },
                    { id: 'effectsFlanger', text: 'Flanger' },
                    { id: 'effectsPhaser', text: 'Phaser' },
                    { id: 'effectsOctavePitch', text: 'Octave and Pitch' },
                    { id: 'effectsWahFilter', text: 'Wah and Filter' },
                    { id: 'effectsEQ', text: 'EQ' },
                    { id: 'effectsTuner', text: 'Tuner' },
                    { id: '', text: 'Volume and Expression' },
                ],
            },
            {
                id: 'pedalUtilities',
                text: 'Pedal Utilities',
                children: [
                    { id: 'pedalboards', text: 'Pedalboards' },
                    { id: 'powerSupplies', text: 'Power Supplies' },
                ],
            },
            { id: 'amplifiers', text: 'Amplifiers' },
        ],
    },
    {
        id: 'recordingAudio',
        text: 'Recording and Audio',
        children: [
            { id: 'microphones', text: 'Microphones' },
            { id: 'audioInterfaces', text: 'Audio Interfaces' },
            { id: 'recordingEquipment', text: 'Recording Equipment' },
            { id: 'speakers', text: 'Speakers' },
            { id: 'headphones', text: 'Headphones' },
        ],
    },
    {
        id: 'toolsAccessories',
        text: 'Tools and Accessories',
        children: [
            { id: 'cables', text: 'Cables' },
            { id: 'stands', text: 'Stands' },
            { id: 'tools', text: 'Tools' },
        ],
    },
];

export default categories;
