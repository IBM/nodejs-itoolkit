      * CRTBNDRPG PGM(xmlservice/zzcall) SRCSTMF('/path/to/nodejs-itoolkit/test/rpg/zzcall.rpgle')
     H AlwNull(*UsrCtl)

     D Step            s             10i 0 inz(0)

     D  INCHARA        S              1a
     D  INCHARB        S              1a
     D  INDEC1         S              7p 4        
     D  INDEC2         S             12p 2
     D  INDS1          DS                  
     D   DSCHARA                      1a
     D   DSCHARB                      1a           
     D   DSDEC1                       7p 4      
     D   DSDEC2                      12p 2            
      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      * main(): Control flow
      *+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     C     *Entry        PLIST                   
     C                   PARM                    INCHARA
     C                   PARM                    INCHARB
     C                   PARM                    INDEC1
     C                   PARM                    INDEC2
     C                   PARM                    INDS1
      /free
        Step +=1;
        INCHARA = 'C';
        INCHARB = 'D';
        INDEC1 = 321.1234;
        INDEC2 = 1234567890.12;
        DSCHARA = 'E';
        DSCHARB = 'F';
        DSDEC1 = 333.333;
        DSDEC2 = 4444444444.44;
        return;
        // *inlr = *on;
      /end-free