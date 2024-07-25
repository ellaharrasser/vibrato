const categories = {
    'guitars': {
        text: 'Guitars',
        children: {
            'acousticGuitars': { text: 'Acoustic Guitars' },
            'electricGuitars': { text: 'Electric Guitars' },
            'bassGuitars': { text: 'Bass Guitars' },
            'guitarPartsAccessories': {
                text: 'Guitar Parts and Accessories',
                children: {
                    'guitarStrings': { text: 'Strings' },
                    'guitarPickups': { text: 'Pickups' },
                    'guitarParts': { text: 'Parts' },
                },
            },
        },
    },
    'keyboardsSynths': {
        text: 'Keyboards and Synths',
        children: {
            'keyboards': {
                text: 'Keyboards',
                children: {
                    'acousticPianos': { text: 'Acoustic Pianos' },
                    'digitalPianos': { text: 'Digital Pianos' },
                    'electricPianos': { text: 'Electric Pianos' },
                    'workstationKeyboards': { text: 'Workstation Keyboards' },
                    'organs': { text: 'Organs' },
                    'midiControllers': { text: 'MIDI Controllers' },
                },
            },
            'synths': {
                text: 'Synths',
                children: {
                    'analogSynths': { text: 'Analog Synths' },
                    'digitalSynths': { text: 'Digital Synths' },
                    'modularSynths': { text: 'Modular Synths' },
                },
            },
            'miscKeysSynths': {
                text: 'Miscellaneous',
                children: {
                    'samplers': { text: 'Samplers' },
                    'softwareKeysSynths': { text: 'Software' },
                },
            },
        },
    },
    'drumsPercussion': {
        text: 'Drums and Percussion',
        children: {
            'acousticDrums': {
                text: 'Acoustic Drums',
                children: {
                    'acousticKits': { text: 'Full Kits' },
                    'acousticKitSnareDrums': { text: 'Snare Drums' },
                    'acousticKitBassDrums': { text: 'Bass Drums' },
                },
            },
            'electronicDrums': {
                text: 'Electronic Drums',
                children: {
                    'electronicKits': { text: 'Electronic Kits' },
                    'electronicKitModules': { text: 'Modules' },
                    'drumMachines': { text: 'Drum Machines' },
                },
            },
            'cymbals': {
                text: 'Cymbals',
                children: {
                    'hihatCymbals': { text: 'Hi-hats' },
                    'rideCymbals': { text: 'Rides' },
                    'crashCymbals': { text: 'Crashes' },
                    'splashCymbals': { text: 'Splashes' },
                },
            },
            'auxiliaryPercussion': { text: 'Auxiliary Percussion' },
            // 'concertPercussion': {
            //     text: 'Concert Percussion',
            //     children: {},
            // },
            // 'malletPercussion': {
            //     text: 'Mallet Percussion',
            //     children: {},
            // },
            'drumPartsAccessories': { text: 'Drum Parts and Accessories' },
        },
    },
    'pedalsAmplifiers': {
        text: 'Pedals and Amplifiers',
        children: {
            'effectsPedals': {
                text: 'Effects and Pedals',
                children: {
                    'boostEffects': { text: 'Boost' },
                    'overdriveEffects': { text: 'Overdrive' },
                    'distortionEffects': { text: 'Distortion' },
                    'fuzzEffects': { text: 'Fuzz' },
                    'compressorEffects': { text: 'Compressor' },
                    'delayEffects': { text: 'Delay' },
                    'reverbEffects': { text: 'Reverb' },
                    'tremoloEffects': { text: 'Tremolo' },
                    'chorusEffects': { text: 'Chorus' },
                    'vibratoEffects': { text: 'Vibrato' },
                    'flangerEffects': { text: 'Flanger' },
                    'phaserEffects': { text: 'Phaser' },
                    'octavePitchEffects': { text: 'Octave and Pitch' },
                    'wahFilterEffects': { text: 'Wah and Filter' },
                    'eqEffects': { text: 'EQ' },
                    'tunerEffects': { text: 'Tuner' },
                    'volumeExpressionEffects': { text: 'Volume and Expression' },
                },
            },
            'pedalUtilities': {
                text: 'Pedal Utilities',
                children: {
                    'pedalboards': { text: 'Pedalboards' },
                    'powerSupplies': { text: 'Power Supplies' },
                },
            },
            'amplifiers': { text: 'Amplifiers' },
        },
    },
    'recordingAudio': {
        text: 'Recording and Audio',
        children: {
            'microphones': { text: 'Microphones' },
            'audioInterfaces': { text: 'Audio Interfaces' },
            'recordingEquipment': { text: 'Recording Equipment' },
            'speakers': { text: 'Speakers' },
            'headphones': { text: 'Headphones' },
        },
    },
    'toolsAccessories': {
        text: 'Tools and Accessories',
        children: {
            'cables': { text: 'Cables' },
            'stands': { text: 'Stands' },
            'tools': { text: 'Tools' },
        },
    },
};

export default categories;
