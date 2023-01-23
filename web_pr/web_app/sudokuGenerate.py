import random
import unittest

class SudokoGenerator():
    field=[[-1 for i in range(9)] for j in range(9)]

    def  isColumnFree(self, number, column):
        for row in self.field:
            if row[column] == number:
                return False
        return True
    
    def isFieldFree(self, number, row, column):
        startx=column
        starty=row
        while not startx%3==0 :
            startx=startx-1
        while not starty%3==0 :
            starty=starty-1
        
        for x in range (3):
            for y in range(3):
                if self.field[starty+y][startx+x]==number:
                    return False
        
          
        return True

   

    def generate(self, number, row):
        if row == 9:
            number=number+1
            row=0
        if number== 10:
            return self.field

        freeFields= []
        for column in range(9):
            if self.isColumnFree(number, column) and self.isFieldFree(number, row, column) and self.field[row][column]==-1:
                freeFields.append(column)
        random.shuffle(freeFields)
        if len(freeFields)==0:
            return False

        newField=False
        for column in freeFields:
            self.field[row][column]= number
            newField= self.generate(number, row+1)
            if newField:
                return self.field
            self.field[row][column]= -1
        
        
        if newField:
            return self.field
        return False


    def setField(self, mode):
        print("Ffskdmflskmdklflm")
        newField=[[ '' for i in range(9)] for j in range(9)]
        columnStart=0
        rowStart=0
        for f in range(9):
            setFields= [1,2,3,4,5,6,7,8,0]
            if mode == 'easy':
                setFields=math.shuffel(setFields)[:4]
            elif mode =='normal':
                setFields=math.shuffel(setFields)[:3]
            else:
                setFields=math.shuffel(setFields)[:2]

            for row in range(3):
                for column in range(3):
                    if (row+column) in setFields:
                        newField[row+rowStart][column+columnStart]=self.field[row][column]
            columnStart=columnStart+3
            if columnStart ==12:
                columnStart=0
                rowStart=rowStart+3
        print(newField)
        print("newField")
        return newField
    
    def isValid(self):
        for x in range(9):
            for y in range(9):
                if self.field[x][y]==-1:
                    return False
        return True
