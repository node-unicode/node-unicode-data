module.exports=JSON.parse(require('zlib').gunzipSync(Buffer.from([31,139,8,0,0,0,0,0,0,19,45,154,91,182,228,172,14,131,39,212,15,5,38,190,140,229,95,103,254,211,56,254,164,253,80,162,118,98,41,46,16,96,210,253,95,101,255,171,156,127,85,191,253,156,253,220,253,196,126,222,126,190,253,228,126,106,63,27,87,27,215,27,215,27,215,27,215,27,215,27,215,27,215,27,215,27,215,27,215,27,55,27,55,27,55,27,55,27,55,27,55,27,55,27,55,27,55,27,55,243,175,127,191,253,156,253,220,253,196,126,222,126,190,253,228,126,106,63,189,159,141,59,27,119,54,238,108,220,217,184,179,113,103,227,206,198,157,141,59,27,119,54,238,110,220,221,184,187,113,119,227,238,198,221,141,187,27,119,55,238,110,220,221,184,216,184,216,184,216,184,216,184,216,184,216,184,216,184,216,184,216,184,216,184,183,113,111,227,222,198,189,141,123,27,247,54,238,109,220,219,184,183,113,111,227,190,141,251,54,238,219,184,111,227,190,141,251,54,238,219,184,111,227,190,141,251,54,46,55,46,55,46,55,46,55,46,55,46,55,46,55,46,55,110,199,163,119,60,122,199,163,119,60,122,199,163,119,60,122,199,163,119,60,122,199,163,119,60,122,199,163,119,60,206,217,135,44,36,80,64,3,123,227,237,175,94,72,160,128,6,184,177,63,125,225,0,23,8,224,1,48,2,70,192,8,24,1,227,193,120,48,30,140,7,227,193,120,48,30,140,7,227,193,120,48,62,24,31,140,15,198,7,227,131,65,186,143,116,31,233,62,210,125,74,55,97,36,140,132,145,48,18,70,194,72,24,9,35,97,36,140,34,184,136,43,226,138,144,34,132,126,249,120,238,199,115,63,158,251,241,220,143,231,126,60,247,227,185,31,207,253,120,238,199,115,63,158,155,235,177,5,125,11,224,1,31,144,64,1,13,44,55,215,108,11,48,46,140,11,227,194,160,239,147,190,79,250,62,233,251,164,239,147,190,79,250,62,233,171,162,155,138,110,42,210,45,210,45,210,45,210,45,210,45,146,44,146,44,146,44,146,44,58,167,232,156,162,75,152,195,135,9,124,152,193,135,41,124,152,195,135,137,115,112,240,193,194,7,15,31,76,124,112,241,193,198,7,31,31,140,124,112,242,193,202,7,47,31,204,124,112,243,193,206,7,63,31,12,125,112,244,193,210,7,79,31,76,125,112,245,193,214,7,95,31,140,125,112,246,193,218,7,111,159,33,120,8,30,130,135,224,33,120,8,30,130,135,224,81,48,63,107,246,103,221,223,246,223,130,190,205,194,246,223,194,1,46,16,192,3,190,133,7,20,33,69,72,17,82,132,148,110,36,128,94,161,87,232,53,193,77,112,19,220,4,55,193,77,112,19,220,196,13,113,67,220,16,183,43,218,61,59,73,22,26,216,144,251,1,251,219,22,14,112,129,0,30,240,1,9,20,208,0,12,210,189,164,123,73,247,146,238,37,221,75,186,151,116,47,233,94,210,189,164,123,73,247,146,238,37,221,219,200,147,243,37,231,75,206,183,97,144,248,37,241,75,226,151,196,47,137,223,129,49,48,6,198,192,24,24,187,32,223,216,21,121,225,0,23,8,224,1,31,176,140,224,183,5,63,43,248,9,193,79,8,126,66,240,19,130,159,16,197,93,126,71,240,59,130,156,131,36,163,245,103,1,13,32,64,146,65,146,143,71,62,30,201,178,116,31,57,63,242,123,228,247,200,239,35,191,239,199,55,204,240,97,6,166,243,101,18,95,38,241,101,94,94,230,224,101,14,94,230,219,2,55,112,73,134,174,173,104,62,110,144,115,146,115,210,217,73,66,73,66,181,19,226,50,37,47,83,242,50,37,47,83,114,161,128,141,99,94,46,112,131,159,197,6,120,217,169,46,91,213,101,175,186,108,86,151,221,234,178,93,93,246,170,203,34,126,89,189,119,156,136,99,44,155,177,108,198,178,25,163,161,35,6,218,64,155,157,166,59,48,189,176,203,77,224,236,192,207,113,214,252,11,31,192,159,59,197,23,2,224,198,211,181,2,26,152,133,143,63,63,254,220,113,91,88,189,251,3,246,199,4,142,13,60,25,248,47,240,95,224,141,192,27,17,59,17,23,248,182,63,53,24,193,136,77,119,225,1,31,176,180,183,86,9,246,158,96,239,9,6,106,161,129,229,126,143,63,201,52,119,144,131,241,8,198,99,161,129,13,73,66,24,158,5,226,182,239,23,136,35,251,36,251,252,136,35,231,76,226,118,224,131,37,50,88,24,131,65,89,72,160,128,6,150,193,18,25,44,145,65,233,18,212,46,193,224,5,131,23,148,47,65,253,18,44,95,193,242,21,140,199,130,190,109,200,172,35,22,30,240,1,9,232,70,3,203,101,133,11,86,184,96,133,11,86,184,96,133,11,86,184,96,133,11,22,183,5,130,233,236,33,171,33,171,41,226,138,184,230,90,115,173,17,32,221,105,221,64,128,116,135,116,135,116,103,80,25,24,164,59,140,199,144,243,48,30,163,196,25,198,217,97,124,191,157,66,11,7,184,64,0,15,248,128,4,10,104,0,198,129,113,96,28,24,7,198,129,113,96,28,24,7,198,129,113,96,92,24,23,198,133,113,97,92,24,23,198,133,113,97,92,24,59,240,239,236,112,63,12,252,48,240,195,192,15,3,63,12,252,48,240,195,192,239,236,246,180,64,240,71,220,71,220,71,200,71,72,243,231,118,211,59,67,220,16,183,203,200,187,252,142,203,239,184,252,142,203,239,184,164,177,203,222,66,112,99,77,184,101,211,138,50,160,143,1,125,12,232,55,219,37,11,5,244,66,8,184,177,62,253,24,193,143,17,76,186,51,233,206,252,237,248,46,204,130,110,20,55,138,27,59,190,201,126,148,204,223,100,63,74,54,155,100,159,73,246,153,100,159,73,246,153,100,159,89,128,49,48,134,184,129,49,200,239,88,230,249,1,235,196,164,8,76,58,34,153,181,201,174,177,43,223,10,80,230,37,235,105,82,230,37,37,93,82,210,37,85,90,82,135,37,117,88,82,135,101,22,176,251,204,194,50,106,199,99,225,1,31,144,64,1,13,108,48,69,76,82,191,36,235,100,178,58,46,112,23,61,150,200,100,94,38,165,75,82,186,36,51,52,153,136,201,68,76,106,149,228,192,145,156,56,146,35,71,114,230,72,14,29,201,169,35,57,118,36,231,141,164,96,79,42,246,164,100,79,106,246,164,104,79,170,246,164,108,79,234,246,164,236,73,202,158,164,236,73,202,158,164,236,73,202,158,156,29,253,133,0,30,192,53,178,98,114,38,229,71,50,67,147,25,154,140,111,50,57,23,246,212,130,189,11,123,23,246,46,236,93,216,187,176,119,97,239,194,222,133,189,235,247,136,123,196,113,162,98,224,139,129,47,6,190,40,63,138,242,163,168,60,22,8,225,52,197,52,40,102,192,130,254,220,71,98,249,5,110,172,69,11,3,47,232,219,3,62,32,129,2,26,88,218,37,191,75,126,236,196,11,5,236,221,224,225,108,204,11,23,32,132,12,216,167,139,125,186,88,229,139,85,190,216,167,139,125,186,216,167,23,96,112,166,99,209,47,22,253,5,130,57,215,237,42,243,175,118,225,0,246,238,35,211,71,106,143,212,168,164,43,253,141,195,39,73,178,99,23,149,116,81,73,23,149,116,81,73,23,187,120,177,139,23,149,116,81,73,23,149,116,81,73,23,59,123,177,179,23,59,201,2,140,128,17,48,2,70,192,8,24,12,5,123,74,177,167,44,192,160,139,147,46,206,7,227,193,120,48,232,241,252,96,208,237,73,183,39,221,158,31,140,15,198,7,227,131,241,193,248,96,36,140,132,145,48,18,70,194,72,24,9,35,97,232,216,205,185,59,57,120,39,39,111,10,145,162,16,89,32,152,209,162,36,89,32,184,116,24,229,52,202,113,153,66,169,41,148,22,56,145,114,100,126,156,153,31,135,230,199,169,249,113,108,126,71,231,87,24,156,156,25,128,157,15,58,207,242,39,39,228,199,17,153,211,98,179,99,55,59,118,115,90,108,78,139,205,105,177,57,45,182,78,139,187,248,134,240,9,57,123,210,105,231,176,70,128,159,48,133,190,222,66,142,170,58,238,248,188,227,3,143,79,60,62,242,248,204,227,67,207,41,157,101,75,135,89,157,128,124,4,242,25,200,135,32,159,130,124,12,58,108,247,160,184,41,110,138,155,226,150,184,37,110,137,91,226,150,184,219,219,231,6,39,179,197,35,188,194,141,185,58,246,94,206,189,219,59,108,138,55,181,115,112,60,4,159,240,19,166,208,49,45,100,103,193,219,32,155,14,238,1,137,175,72,225,198,135,246,215,208,142,26,218,62,131,179,12,184,49,91,158,61,33,87,238,230,6,134,80,215,195,215,21,41,181,203,118,186,136,206,86,211,194,35,20,247,137,251,196,213,83,174,159,242,196,125,226,62,113,147,72,142,1,160,191,63,225,39,76,97,9,91,8,43,148,79,40,159,80,62,161,124,66,249,132,242,9,229,19,202,39,148,79,40,159,80,62,172,46,79,133,229,83,101,185,219,150,98,158,242,124,202,243,41,207,167,60,121,199,176,168,120,78,1,224,21,250,202,19,126,194,20,194,250,234,39,84,76,41,166,81,254,134,152,84,62,233,239,211,66,88,69,237,180,24,66,98,74,99,87,20,21,139,186,254,165,16,53,60,249,92,88,185,158,82,241,180,43,16,123,254,199,150,1,126,66,95,41,97,11,7,92,103,130,71,120,133,33,20,55,196,13,113,67,220,16,55,196,253,116,253,211,245,79,215,63,93,79,105,166,52,83,154,41,205,148,102,74,51,197,77,113,83,220,20,183,196,101,251,78,92,186,43,29,123,99,178,162,128,33,124,194,79,200,238,172,178,165,85,183,180,10,151,61,39,29,225,21,182,80,215,207,79,168,187,159,238,126,33,124,194,81,17,160,109,95,202,243,251,9,143,240,10,217,216,113,11,88,194,22,178,155,171,234,25,94,78,129,87,168,120,244,135,23,84,160,202,0,250,121,235,0,21,2,148,103,195,193,16,60,194,43,84,204,168,118,24,149,17,35,238,168,134,24,23,17,174,34,84,70,144,231,162,170,137,79,215,83,215,25,139,225,220,8,94,97,8,159,176,132,168,117,27,225,182,242,25,60,179,216,66,174,79,232,58,158,89,12,225,19,126,194,20,138,21,98,133,88,42,86,168,95,23,217,165,127,20,245,139,165,235,108,82,63,42,89,80,49,42,105,92,211,184,168,113,85,243,83,153,68,65,187,56,226,142,184,84,13,191,163,239,231,239,123,8,83,232,226,202,213,21,87,130,173,242,23,122,110,232,185,161,231,134,158,27,122,174,138,154,159,170,154,159,202,154,159,10,143,31,187,228,34,155,242,143,119,139,32,172,157,84,194,16,250,202,39,76,97,9,209,249,142,34,143,34,143,34,143,34,213,51,165,187,165,187,165,187,165,187,245,119,183,132,45,36,135,82,153,88,170,19,75,133,98,169,72,100,79,164,250,251,132,41,84,101,72,221,242,163,148,165,44,84,12,85,203,143,119,117,160,238,154,171,186,80,253,124,212,207,71,253,124,56,60,236,170,68,111,28,230,26,232,43,148,149,135,170,105,145,43,170,19,207,165,6,91,60,194,43,212,93,178,93,252,132,41,84,124,40,82,58,172,237,139,20,87,39,84,182,134,234,214,160,170,90,44,97,11,21,169,156,153,119,165,247,194,165,23,195,165,247,193,165,23,194,165,55,194,165,87,194,165,215,193,165,247,193,165,23,194,165,55,194,165,87,194,219,215,215,216,66,184,69,117,184,120,132,87,24,194,39,252,132,98,133,11,101,213,209,163,66,122,84,73,143,74,233,81,45,61,142,81,53,77,127,94,94,152,128,42,173,41,36,47,251,41,248,9,83,88,66,184,247,83,252,167,120,85,239,247,83,124,234,123,25,117,165,164,80,82,40,41,148,20,90,10,45,5,74,117,85,44,165,138,165,84,177,148,42,22,240,9,63,97,10,75,216,66,126,5,187,48,40,238,19,87,249,107,212,110,41,207,82,158,165,60,169,205,74,111,191,74,175,191,64,212,88,187,192,35,20,75,191,136,170,172,244,102,12,36,94,94,189,242,234,109,233,183,244,91,250,45,253,150,126,127,142,111,33,217,182,158,210,122,74,235,41,173,167,180,158,210,122,10,47,153,65,113,83,220,20,183,196,45,113,213,195,173,30,110,245,112,171,135,91,61,204,11,185,197,86,188,250,185,213,207,221,138,215,121,136,151,33,165,106,13,60,194,43,12,225,19,114,4,210,1,81,111,235,64,221,189,186,203,60,10,29,16,67,39,196,96,175,7,165,204,104,134,102,232,226,39,228,250,209,179,52,47,130,121,177,171,252,62,23,12,225,19,126,194,4,203,88,194,22,14,216,226,174,151,192,85,120,188,88,0,83,88,66,42,231,224,95,209,212,80,47,15,175,100,212,60,55,159,154,244,197,244,197,252,187,152,110,202,77,187,25,53,42,196,183,49,175,204,43,243,202,188,50,175,204,211,63,113,13,175,109,212,28,55,215,141,84,66,135,129,109,254,254,90,205,171,53,72,205,231,38,221,148,155,118,51,106,56,147,92,45,72,106,174,155,112,99,149,207,42,159,85,62,171,124,86,249,172,146,86,73,171,164,85,210,42,127,41,165,85,210,42,105,149,180,74,90,165,172,82,86,41,171,148,85,202,42,101,149,178,74,89,165,172,82,86,105,171,180,85,218,42,109,149,182,74,91,165,173,210,86,105,171,180,85,198,42,99,149,177,202,88,101,172,50,86,25,171,140,85,70,42,28,77,213,60,55,159,155,116,83,110,254,34,245,60,14,170,106,142,155,235,198,42,199,42,199,42,199,42,199,42,199,42,199,42,215,42,215,42,215,42,215,42,215,42,215,42,215,42,215,42,215,42,215,42,97,149,176,74,88,37,172,18,86,9,171,132,85,194,42,97,149,176,202,179,202,179,202,179,202,179,138,253,249,236,207,103,127,62,251,243,217,159,207,254,124,246,231,179,63,159,253,249,236,179,103,23,240,207,34,219,240,15,35,106,142,155,235,38,220,124,110,210,77,185,105,55,166,123,0,62,15,192,231,1,248,60,0,159,7,224,243,0,124,30,128,207,3,240,121,0,62,13,128,150,79,53,199,205,117,19,110,158,155,207,77,186,105,55,166,143,233,99,250,152,62,166,143,233,99,250,152,46,215,109,99,21,245,196,29,245,196,29,245,132,254,41,69,77,184,121,110,202,77,187,49,239,152,119,204,59,230,29,243,244,219,181,188,170,49,207,63,122,174,121,215,60,185,238,59,178,198,119,100,141,239,200,26,223,145,53,182,59,127,110,142,27,17,238,247,215,132,155,231,230,115,147,110,202,205,174,232,187,80,178,17,208,28,55,215,77,184,121,110,62,55,233,166,220,252,209,71,77,89,165,172,82,86,41,171,148,85,202,42,101,149,178,74,89,165,172,210,86,105,171,180,85,218,42,109,149,182,74,91,165,173,210,86,105,171,140,85,198,42,99,149,177,202,88,101,172,50,86,25,171,140,85,70,42,252,159,18,53,199,205,117,19,110,158,155,207,77,186,41,55,237,198,42,199,42,199,42,199,42,199,42,199,42,199,42,199,42,199,42,199,42,199,42,215,42,215,42,215,42,215,42,215,42,215,42,215,42,215,42,215,42,215,42,97,149,176,74,88,37,172,18,86,9,171,132,85,194,42,97,149,176,202,179,202,179,202,179,202,179,202,179,202,179,202,179,202,179,202,179,202,179,202,103,149,207,42,159,85,62,171,124,86,249,172,242,89,229,179,138,77,75,69,71,99,239,182,189,219,246,110,219,187,109,239,182,189,219,246,110,219,187,109,239,182,189,219,246,110,219,187,109,239,182,189,219,246,110,219,187,109,239,182,189,219,246,110,219,187,109,239,182,189,219,246,110,219,187,109,239,182,189,219,246,110,219,187,109,239,182,189,219,246,110,219,187,109,239,182,189,219,246,110,219,187,109,239,182,189,219,246,110,219,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,216,187,99,239,142,189,59,246,238,204,252,239,255,249,9,19,23,74,40,0,0])))