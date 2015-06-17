var resources = [
	{
		'version': '1.1.5',
		'main': 'http://unicode.org/Public/1.1-Update/UnicodeData-1.1.5.txt'
	},
	{
		'version': '2.0.14',
		'main': 'http://unicode.org/Public/2.0-Update/UnicodeData-2.0.14.txt'
	},
	{
		'version': '2.1.2',
		'main': 'http://unicode.org/Public/2.1-Update/UnicodeData-2.1.2.txt'
	},
	{
		'version': '2.1.5',
		'main': 'http://unicode.org/Public/2.1-Update2/UnicodeData-2.1.5.txt'
	},
	{
		'version': '2.1.8',
		'main': 'http://unicode.org/Public/2.1-Update3/UnicodeData-2.1.8.txt'
	},
	{
		'version': '2.1.9',
		'main': 'http://unicode.org/Public/2.1-Update4/UnicodeData-2.1.9.txt'
	},
	{
		'version': '3.0.0',
		'main': 'http://unicode.org/Public/3.0-Update/UnicodeData-3.0.0.txt',
		//'blocks': 'http://unicode.org/Public/3.0-Update/Blocks-3.txt', // issue #1
		//'properties': 'http://unicode.org/Public/3.0-Update/PropList-3.0.0.txt' // issue #2
	},
	{
		'version': '3.0.1',
		'main': 'http://unicode.org/Public/3.0-Update1/UnicodeData-3.0.1.txt'
		//'properties': 'http://unicode.org/Public/3.0-Update1/PropList-3.0.1.txt' // issue #2
	},
	{
		'version': '3.1.0',
		'main': 'http://unicode.org/Public/3.1-Update/UnicodeData-3.1.0.txt',
		'scripts': 'http://unicode.org/Public/3.1-Update/Scripts-3.1.0.txt',
		'blocks': 'http://unicode.org/Public/3.1-Update/Blocks-4.txt',
		'properties': 'http://unicode.org/Public/3.1-Update/PropList-3.1.0.txt',
		'derived-core-properties': 'http://unicode.org/Public/3.1-Update/DerivedCoreProperties-3.1.0.txt',
		'case-folding': 'http://unicode.org/Public/3.1-Update/CaseFolding-3.txt'
	},
	{
		'version': '3.2.0',
		'main': 'http://unicode.org/Public/3.2-Update/UnicodeData-3.2.0.txt',
		'scripts': 'http://unicode.org/Public/3.2-Update/Scripts-3.2.0.txt',
		'blocks': 'http://unicode.org/Public/3.2-Update/Blocks-3.2.0.txt',
		'properties': 'http://unicode.org/Public/3.2-Update/PropList-3.2.0.txt',
		'derived-core-properties': 'http://unicode.org/Public/3.2-Update/DerivedCoreProperties-3.2.0.txt',
		'case-folding': 'http://unicode.org/Public/3.2-Update/CaseFolding-3.2.0.txt'
	},
	{
		'version': '4.0.0',
		'main': 'http://unicode.org/Public/4.0-Update/UnicodeData-4.0.0.txt',
		'scripts': 'http://unicode.org/Public/4.0-Update/Scripts-4.0.0.txt',
		'blocks': 'http://unicode.org/Public/4.0-Update/Blocks-4.0.0.txt',
		'properties': 'http://unicode.org/Public/4.0-Update/PropList-4.0.0.txt',
		'derived-core-properties': 'http://unicode.org/Public/4.0-Update/DerivedCoreProperties-4.0.0.txt',
		'case-folding': 'http://unicode.org/Public/4.0-Update/CaseFolding-4.0.0.txt'
	},
	{
		'version': '4.0.1',
		'main': 'http://unicode.org/Public/4.0-Update1/UnicodeData-4.0.1.txt',
		'scripts': 'http://unicode.org/Public/4.0-Update1/Scripts-4.0.1.txt',
		'blocks': 'http://unicode.org/Public/4.0-Update1/Blocks-4.0.1.txt',
		'properties': 'http://unicode.org/Public/4.0-Update1/PropList-4.0.1.txt',
		'derived-core-properties': 'http://unicode.org/Public/4.0-Update1/DerivedCoreProperties-4.0.1.txt',
		'case-folding': 'http://unicode.org/Public/4.0-Update1/CaseFolding-4.0.1.txt'
	},
	{
		'version': '4.1.0',
		'main': 'http://unicode.org/Public/4.1.0/ucd/UnicodeData.txt',
		'scripts': 'http://unicode.org/Public/4.1.0/ucd/Scripts.txt',
		'blocks': 'http://unicode.org/Public/4.1.0/ucd/Blocks.txt',
		'properties': 'http://unicode.org/Public/4.1.0/ucd/PropList.txt',
		'derived-core-properties': 'http://unicode.org/Public/4.1.0/ucd/DerivedCoreProperties.txt',
		'case-folding': 'http://unicode.org/Public/4.1.0/ucd/CaseFolding.txt',
		'bidi-mirroring': 'http://unicode.org/Public/4.1.0/ucd/BidiMirroring.txt'
	},
	{
		'version': '5.0.0',
		'main': 'http://unicode.org/Public/5.0.0/ucd/UnicodeData.txt',
		'scripts': 'http://unicode.org/Public/5.0.0/ucd/Scripts.txt',
		'blocks': 'http://unicode.org/Public/5.0.0/ucd/Blocks.txt',
		'properties': 'http://unicode.org/Public/5.0.0/ucd/PropList.txt',
		'derived-core-properties': 'http://unicode.org/Public/5.0.0/ucd/DerivedCoreProperties.txt',
		'case-folding': 'http://unicode.org/Public/5.0.0/ucd/CaseFolding.txt',
		'bidi-mirroring': 'http://unicode.org/Public/5.0.0/ucd/BidiMirroring.txt'
	},
	{
		'version': '5.1.0',
		'main': 'http://unicode.org/Public/5.1.0/ucd/UnicodeData.txt',
		'scripts': 'http://unicode.org/Public/5.1.0/ucd/Scripts.txt',
		'blocks': 'http://unicode.org/Public/5.1.0/ucd/Blocks.txt',
		'properties': 'http://unicode.org/Public/5.1.0/ucd/PropList.txt',
		'derived-core-properties': 'http://unicode.org/Public/5.1.0/ucd/DerivedCoreProperties.txt',
		'case-folding': 'http://unicode.org/Public/5.1.0/ucd/CaseFolding.txt',
		'bidi-mirroring': 'http://unicode.org/Public/5.1.0/ucd/BidiMirroring.txt'
	},
	{
		'version': '5.2.0',
		'main': 'http://unicode.org/Public/5.2.0/ucd/UnicodeData.txt',
		'scripts': 'http://unicode.org/Public/5.2.0/ucd/Scripts.txt',
		'blocks': 'http://unicode.org/Public/5.2.0/ucd/Blocks.txt',
		'properties': 'http://unicode.org/Public/5.2.0/ucd/PropList.txt',
		'derived-core-properties': 'http://unicode.org/Public/5.2.0/ucd/DerivedCoreProperties.txt',
		'case-folding': 'http://unicode.org/Public/5.2.0/ucd/CaseFolding.txt',
		'bidi-mirroring': 'http://unicode.org/Public/5.2.0/ucd/BidiMirroring.txt'
	},
	{
		'version': '6.0.0',
		'main': 'http://unicode.org/Public/6.0.0/ucd/UnicodeData.txt',
		'scripts': 'http://unicode.org/Public/6.0.0/ucd/Scripts.txt',
		'blocks': 'http://unicode.org/Public/6.0.0/ucd/Blocks.txt',
		'properties': 'http://unicode.org/Public/6.0.0/ucd/PropList.txt',
		'derived-core-properties': 'http://unicode.org/Public/6.0.0/ucd/DerivedCoreProperties.txt',
		'case-folding': 'http://unicode.org/Public/6.0.0/ucd/CaseFolding.txt',
		'bidi-mirroring': 'http://unicode.org/Public/6.0.0/ucd/BidiMirroring.txt'
	},
	{
		'version': '6.1.0',
		'main': 'http://unicode.org/Public/6.1.0/ucd/UnicodeData.txt',
		'scripts': 'http://unicode.org/Public/6.1.0/ucd/Scripts.txt',
		'blocks': 'http://unicode.org/Public/6.1.0/ucd/Blocks.txt',
		'properties': 'http://unicode.org/Public/6.1.0/ucd/PropList.txt',
		'derived-core-properties': 'http://unicode.org/Public/6.1.0/ucd/DerivedCoreProperties.txt',
		'case-folding': 'http://unicode.org/Public/6.1.0/ucd/CaseFolding.txt',
		'bidi-mirroring': 'http://unicode.org/Public/6.1.0/ucd/BidiMirroring.txt'
	},
	{
		'version': '6.2.0',
		'main': 'http://unicode.org/Public/6.2.0/ucd/UnicodeData.txt',
		'scripts': 'http://unicode.org/Public/6.2.0/ucd/Scripts.txt',
		'blocks': 'http://unicode.org/Public/6.2.0/ucd/Blocks.txt',
		'properties': 'http://unicode.org/Public/6.2.0/ucd/PropList.txt',
		'derived-core-properties': 'http://unicode.org/Public/6.2.0/ucd/DerivedCoreProperties.txt',
		'case-folding': 'http://unicode.org/Public/6.2.0/ucd/CaseFolding.txt',
		'bidi-mirroring': 'http://unicode.org/Public/6.2.0/ucd/BidiMirroring.txt'
	},
	{
		'version': '6.3.0',
		'main': 'http://unicode.org/Public/6.3.0/ucd/UnicodeData.txt',
		'scripts': 'http://unicode.org/Public/6.3.0/ucd/Scripts.txt',
		'blocks': 'http://unicode.org/Public/6.3.0/ucd/Blocks.txt',
		'properties': 'http://unicode.org/Public/6.3.0/ucd/PropList.txt',
		'derived-core-properties': 'http://unicode.org/Public/6.3.0/ucd/DerivedCoreProperties.txt',
		'case-folding': 'http://unicode.org/Public/6.3.0/ucd/CaseFolding.txt',
		'bidi-mirroring': 'http://unicode.org/Public/6.3.0/ucd/BidiMirroring.txt',
		'bidi-brackets': 'http://unicode.org/Public/6.3.0/ucd/BidiBrackets.txt',
	},
	{
		'version': '7.0.0',
		'main': 'http://unicode.org/Public/7.0.0/ucd/UnicodeData.txt',
		'scripts': 'http://unicode.org/Public/7.0.0/ucd/Scripts.txt',
		'blocks': 'http://unicode.org/Public/7.0.0/ucd/Blocks.txt',
		'properties': 'http://unicode.org/Public/7.0.0/ucd/PropList.txt',
		'derived-core-properties': 'http://unicode.org/Public/7.0.0/ucd/DerivedCoreProperties.txt',
		'case-folding': 'http://unicode.org/Public/7.0.0/ucd/CaseFolding.txt',
		'bidi-mirroring': 'http://unicode.org/Public/7.0.0/ucd/BidiMirroring.txt',
		'bidi-brackets': 'http://unicode.org/Public/7.0.0/ucd/BidiBrackets.txt',
	},
	{
		'version': '8.0.0',
		'main': 'http://unicode.org/Public/8.0.0/ucd/UnicodeData.txt',
		'scripts': 'http://unicode.org/Public/8.0.0/ucd/Scripts.txt',
		'blocks': 'http://unicode.org/Public/8.0.0/ucd/Blocks.txt',
		'properties': 'http://unicode.org/Public/8.0.0/ucd/PropList.txt',
		'derived-core-properties': 'http://unicode.org/Public/8.0.0/ucd/DerivedCoreProperties.txt',
		'case-folding': 'http://unicode.org/Public/8.0.0/ucd/CaseFolding.txt',
		'bidi-mirroring': 'http://unicode.org/Public/8.0.0/ucd/BidiMirroring.txt',
		'bidi-brackets': 'http://unicode.org/Public/8.0.0/ucd/BidiBrackets.txt',
	}
];

module.exports = resources;
