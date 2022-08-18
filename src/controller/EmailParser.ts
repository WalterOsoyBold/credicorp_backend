import * as fs from 'fs';

export default class EmailParser {
    static getEmailString(templateName: string, replaceWords: any[]): any {
        let emailString: string = fs.readFileSync(process.cwd() +'/src/templates/email/' + templateName + '.html', 'utf8');
        for (let i in replaceWords) {
            const replaceData = replaceWords[i];
            emailString = emailString.replace(replaceData.word, replaceWords[i].replacement);
        }
        return emailString;
        //co
    }
}
