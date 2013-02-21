__all__ = ["Statistiche"]

import glob
import csv

class InputdirError (Exception):
    '''Inputdir deve contenere un file per ognuna delle generazioni di un trentenio, nominato "Pc_gen_"+numero_generazione+"_"+inizio_trentenio+"_"+fine_trentenio+".csv"
    viene considerato solo il trentenio della prima generazione 1'''
    pass

class InputfileError (Exception):
    '''I file di input devono essere csv separati da spazi che contengono le colonne month, day, year, e poi una colonna a stazione con il nome; la prima riga riga contiene l\'intestazione della colonna (sono quelle elencate prima), le righe successive i valori registrati a quella particolare data '''
    pass

class DataError (Exception):
    '''Le date devono essere del formato gg/mm/aaaa'''
    pass

class  LocationError(Exception):
    '''Le stazioni devono essere quelle dei file di input'''
    pass

class Statistiche:
    '''Contiene metodi per il calcolo di alcune statistiche sulle generazioni del weathergenerator'''
    def __init__(self, input_dir=None):
        '''Inizializza le variabili di istanza, controlla la correttezza della cartella di input passata come parametro (deve contenere un file a generazione di un trentenio, nominato "Pc_gen_"+numero_generazione+"_"+inizio_trentenio+"_"+fine_trentenio+".csv"), carica i dati (se nella cartella sono presente file di piu\' trenteni viene considerato solo il trentenio della prima generazione 1 (usare cartelle separate per trenteni separati)'''
        self.serie={}
        self.accumuli={}
        self.classifica_accumuli={}
        self.date={}
        lista_file=self.__check_inputdir(input_dir)
        self.__read_data(lista_file)

    def __check_inputdir(self,input_dir):
        '''Controlla correttezza cartella di input'''
        file=glob.glob(input_dir+"/Pc_gen_*[0]1_2???_2???.csv") #prendo il file della generazione uno
        try :
            file=file[0].split("/")
            nome_file=file.pop()  #prendo solo il nome del file senza path
            nome_file=nome_file.split(".")[0]
            nome_file=nome_file.split("_")
            print "Trentenio "+nome_file[3]+" "+nome_file[4] #trentenio considerato
            lista_file=glob.glob(input_dir+"/Pc_gen_*_"+nome_file[3]+"_"+nome_file[4]+".csv") #lista dei file contentente le generazioni
            print "Numero di generazioni: "+str(len(lista_file))
        except :
            msg="Inputdir deve contenere un file per ognuna delle generazioni di un trentenio, nominato Pc_gen_+numero_generazione+_+inizio_trentenio+_+fine_trentenio+.csv, viene considerato solo il trentenio della prima generazione 1 che quindi deve essere presente"
            raise InputdirError(msg)
        return lista_file

    def __initializedict(self,file):
        '''Crea le entrate del dizionario dei dati'''
        readed=csv.reader(open(file),delimiter=" ")
        temp=[]
        for row in readed:
            temp.append(row)
        header=temp[0]
        for key in header[3:]:
            self.serie[key]={} #creo un dizionario per ciascuna delle stazioni

    def __exctractdate(self,file):
        '''Estrae le date gg/mm/aaaa dai file di input e crea un dizionario in cui a una data corrisponde una posizione'''
        readed=csv.reader(open(file),delimiter=" ")
        rows_input=[]
        for row in readed:
            rows_input.append(row)
        giorno=0
        for row in rows_input[1:]:  #estraggo la lista delle date
            day=row[1]
            month=row[0]
            year=row[2]
            if (int(day)<10):
                day='0'+day
            if (int(month)<10):
                month='0'+month
            self.date[day+"/"+month+"/"+year]=giorno #date e' un dizionario che fa corrispondere a una data la posizione in cui andare a cercare il valore per quella data
            giorno+=1

    def __read_data(self,lista_file):
        '''Legge i dati dai file e crea un dizionario dove a ogni stazione viene assegnato un dizionario in cui sono contenute le generazioni del weather generator, le date vengono messe in un dizionario a parte'''
        self.__initializedict(lista_file[0])  #inizializza il dizionario con il primo file, indifferente perche' tutti i file devono avere le stesse colonne
        self.__exctractdate(lista_file[0])
        for file in lista_file:
            nome_file=file.split("/").pop()
            gen=nome_file.split("_")[2] #estraggo la generazione che si sta considerando
            readed=csv.reader(open(file),delimiter=" ")
            rows_input=[]
            for row in readed: #leggo il file di input per riga e lo salvo in rows_input
                rows_input.append(row)
            self.__check_inputfile(rows_input,file)
            colonne=[[] for i in range(3,len(rows_input[0]))] #creo una lista con le colonne del file
            for row in rows_input[1:]:  #ciclo le righe inserendo gli elementi nelle colonne
                for i,el in enumerate(row[3:]): #salto i primi tre che sono anno mese giorno
                    colonne[i].append(el)
            for i,colonna in enumerate(colonne): #per ogni colonna
                try:
                    self.serie[rows_input[0][i+3]][gen]=colonna #inserisco nel dizionario della stazione indicata nella prima riga la colonna con chiave la generazione corrent
                except:
                    msg="I file di input non hanno tutti lo stesso header, ci sono probabilmente nomi di stazioni diverse in file diversi"
                    raise InputfileError(msg)
        self.__check_data()


    def __check_data(self):
        '''Controlla i dati in serie dopo il caricamento'''
        num_gen=0
        num_variazioni=-1 #inizializzo a -1 perche' una volta varia sicuramente, essendo num_gen inizialmente 0
        for staz in self.serie.iterkeys():
            if (num_gen!=len(self.serie[staz])):
                num_variazioni+=1
            num_gen=len(self.serie[staz])
        if (num_variazioni>0):
            print "Warning: Il numero di generazioni non e' uguale per tutte le stazioni"
            #for staz in self.serie.iterkeys():
            #print staz
            #print len(self.serie[staz])
            #for gen in self.serie[staz].iterkeys():
            #print "chiave "+staz
            #print "gen "+gen
            #print self.serie[staz][gen]


    def __check_inputfile(self,rows_input,file):
        '''Controlla che i file di input abbiano le colonne giuste'''
        if not (rows_input[0][0]=="month" and rows_input[0][1]=="day" and rows_input[0][2]=="year"):
            msg="File "+file+" non corretto. I file di input devono essere csv separati da spazi che contengono le colonne month, day, year e poi una colonna a stazione con il suo nome; la prima riga contiene l\'intestazione della colonna (sono quelle elencate prima), le righe successive i valori registrati a quella particolare data"
            raise InputfileError(msg)

    def __data_to_pos(self,day):
        '''Converte una data gg/mm/aaaa nel numero che identifica la posizione in cui recupare il dato che si riferisce a questo giorno'''
        try:
            pos=self.date[day]
        except:
            msg="Data specificata "+day+" non valida o inesistente, usare gg/mm/aaaa"
            raise DataError(msg)
        return pos

    def __calcola_accumuli(self,day_start,day_end):
        '''Crea un dizionario dove ad ogni stazione viene assegnato un dizionario dove sono contenuti gli accumuli di ogni generazione'''
        start=self.__data_to_pos(day_start)
        end=self.__data_to_pos(day_end)
        for staz in self.serie.iterkeys():  #ciclo sulle stazioni
            self.accumuli[staz]={}  #creo un dizionario per la stazione corrente in cui ad ogni chiave rappresentatne una generazione rappresenta l'accumulo di questa
            for gen in self.serie[staz].iterkeys():  #ciclo sulle generazioni di ogni stazione
                accumulo=0
                for val in self.serie[staz][gen][start:end+1]:  #ciclo su ciascun valore giornaliero della generazione calcolando l'accumulo
                    accumulo+=float(val)
                self.accumuli[staz][gen]=accumulo  #inserisco nel dizionario della staz il valore di accumulo per la generazione gen
                #print "gen "+gen+" accumulo "+str(accumulo)

    def rank_accumuli(self,outputfile,day_start,day_end):
        '''Calcola gli accumuli dal giorno day_start (gg/mm/aaaa) al giorno day_end di ogni generazione per ciascuna stazione e li ordina in ordine decrescente, scrive nel file di output una riga a stazione dove vengono elencate le generazioni da quella con piu accumulo a quella con meno'''
        self.__calcola_accumuli(day_start,day_end)
        for staz in self.accumuli.iterkeys(): #ciclo sulle stazioni
            gen_sorted=sorted(self.accumuli[staz].iteritems(), key=lambda x: x[1], reverse=True) #crea una lista di tuple ordinate sul secondo valore, cioe' gli accumuli
            self.classifica_accumuli[staz]=[gen[0] for gen in gen_sorted] #in classifica_accumuli ogni stazione ha la lista delle generazioni, ordinate da quella con piu' accumulo a quella con meno
        self.__write_filerank(outputfile)

    def __write_filerank(self,outputfile):
        '''Scrive su il file di output il rank degli accumuli'''
        out=csv.writer(open(outputfile,"wb"),delimiter=" ")
        for staz in self.classifica_accumuli.iterkeys():
            out.writerow([staz]+self.classifica_accumuli[staz])

    def __calcola_somma(self,staz,gen,day_start,day_end):
        '''Calcola la somma dei valori tra day start, day end compresi per la stazione staz e la generazione gen'''
        start=self.__data_to_pos(day_start)
        end=self.__data_to_pos(day_end)
        somma=0
        for val in self.serie[staz][gen][start:(end+1)]: #calcolo somma
            somma+=float(val)
        return somma

    def __calcola_stagionali(self,staz,primo_anno,secondo_anno):
        '''Ritorna un dizionario in cui a ogni generazione corrisponde una lista con 5 valori uno a stagione: autunno (settembre-novembre), inverno (dicembre-febbraio), primavera (marzo-maggio), estate (giugno-agosto)'''
        stagionali={}
        for gen in self.serie[staz].iterkeys(): #per ogni generazione
            primo_autunno=self.__calcola_somma(staz,gen,"01/09/"+str(primo_anno),"30/11/"+str(primo_anno))
            inverno=self.__calcola_somma(staz,gen,"01/12/"+str(primo_anno),"28/02/"+str(secondo_anno))
            primavera=self.__calcola_somma(staz,gen,"01/03/"+str(secondo_anno),"31/05/"+str(secondo_anno))
            estate=self.__calcola_somma(staz,gen,"01/06/"+str(secondo_anno),"31/08/"+str(secondo_anno))
            secondo_autunno=self.__calcola_somma(staz,gen,"01/09/"+str(secondo_anno),"30/11/"+str(secondo_anno))
            stagionali[gen]=[primo_autunno,inverno,primavera,estate,secondo_autunno]
        return stagionali

    def __calcola_mensili(self,staz,primo_anno,secondo_anno):
        '''Ritorna un dizionario in cui a ogni generazione corrisponde una lista con 13 valori (uno al mese dal settembre del primo anno al settembre del secondo anno)'''
        mensili={}
        for gen in self.serie[staz].iterkeys(): #per ogni generazione
            primo_settembre=self.__calcola_somma(staz,gen,"01/09/"+str(primo_anno),"30/09/"+str(primo_anno))
            ottobre=self.__calcola_somma(staz,gen,"01/10/"+str(primo_anno),"31/10/"+str(primo_anno))
            novembre=self.__calcola_somma(staz,gen,"01/11/"+str(primo_anno),"30/11/"+str(primo_anno))
            dicembre=self.__calcola_somma(staz,gen,"01/12/"+str(primo_anno),"31/12/"+str(primo_anno))
            gennaio=self.__calcola_somma(staz,gen,"01/01/"+str(secondo_anno),"31/01/"+str(secondo_anno))
            febbraio=self.__calcola_somma(staz,gen,"01/02/"+str(secondo_anno),"28/02/"+str(secondo_anno))
            marzo=self.__calcola_somma(staz,gen,"01/03/"+str(secondo_anno),"31/03/"+str(secondo_anno))
            aprile=self.__calcola_somma(staz,gen,"01/04/"+str(secondo_anno),"30/04/"+str(secondo_anno))
            maggio=self.__calcola_somma(staz,gen,"01/05/"+str(secondo_anno),"31/05/"+str(secondo_anno))
            giugno=self.__calcola_somma(staz,gen,"01/06/"+str(secondo_anno),"30/06/"+str(secondo_anno))
            luglio=self.__calcola_somma(staz,gen,"01/07/"+str(secondo_anno),"31/07/"+str(secondo_anno))
            agosto=self.__calcola_somma(staz,gen,"01/08/"+str(secondo_anno),"31/08/"+str(secondo_anno))
            secondo_settembre=self.__calcola_somma(staz,gen,"01/09/"+str(secondo_anno),"30/09/"+str(secondo_anno))
            mensili[gen]=[primo_settembre,ottobre,novembre,dicembre,gennaio,febbraio,marzo,aprile,maggio,giugno,luglio,agosto,secondo_settembre]
        return mensili

    def compute_statistics(self,stazione,primo_anno,secondo_anno):
        '''Calcola per la stazione passata in input alcune statistiche sull\'arco di due anni: ritorna una tupla con al primo posto gli accumuli stagionali (autunno primo anno, inverno, primavera, estate, autunno secondo anno), al secondo gli accumuli mensili (dal settembre del primo anno al settembre del secondo anno).
        Gli accumuli stagionali sono un dizionario in cui a ogni generazione corrisponde una lista con 5 valori (uno a stagione), gli accumuli mensili un dizionario in cui a ogni generazione corrisponde una lista con 13 valori (uno al mese dal settembre del primo anno al settembre del secondo anno)'''
        if (not stazione in self.serie):
            msg = "I dati della stazione "+stazione+" non sono presenti nei file input"
            raise LocationError(msg)
        stagionali=self.__calcola_stagionali(stazione,primo_anno,secondo_anno)
        mensili=self.__calcola_mensili(stazione,primo_anno,secondo_anno)
        return (stagionali,mensili)

if __name__ == "__main__":
    input_dir="/hardmnt/moll0/home/mpoletti/weather_generator_prec/200gen_2071_2099"
    sta=Statistiche(input_dir)
    sta.rank_accumuli("rank_annata_71_99.csv","01/09/2073","31/12/2074")
    sta.rank_accumuli("rank_estate_71_99.csv","21/06/2074","21/09/2074")
    sta.rank_accumuli("rank_inverno_71_99.csv","21/12/2073","21/03/2074")
    #statistics=sta.compute_statistics("T0094",2085,2086)
    #print "stagionali"
    #print statistics[0]
    #print "mensili"
    #print statistics[1]