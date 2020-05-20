
var express=require("express");
var app=express();
var bodyParser=require("body-parser");
const odb=require('oracledb');

const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  username => users.find(user => user.username === username)

)

const users = [
    {
        username:'abhimsi',
        password:'abhimsi'
    }
]
app.use( express.static( "views" ));
app.use( express.static( "views/partials" ));
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: '90000000000',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))





app.use(function(req,res,next)
{

    res.locals.success=req.flash("success");
    delete req.session.sessionFlash;

    next();
})


odb.outFormat=odb.OUT_FORMAT_ARRAY;


app.use(bodyParser.urlencoded({extended:true}));



app.set("view engine","ejs");
const config=

{
    user:'abhimsi',
    password:'abhimsi',
    connectString:'localhost'
}


app.get("/",function(req,res)
{
    res.redirect("/login");
})

app.get("/login",checkNotAuthenticated,function(req,res)
{
    res.render('login.ejs');
})

app.post('/login',checkNotAuthenticated,passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: true
}))



app.get("/home",checkAuthenticated,function(req,res)
{
    req.flash("success");
    res.render("home");
});





app.get("/getall",checkAuthenticated,function(req,res)
{
    async function re(){
    await getall();
    res.render("getall.ejs",{result:result});
    };
    re();
});


app.get("/search/specific",checkAuthenticated,function(req,res)
{
    res.render("search.ejs");
});

app.post("/search/specific",checkAuthenticated,function(req,res)
{
    var usn_got;
    function getinput(){
        console.log(req.body);
        searchby=req.body.searchby;
        searchvalue=req.body.searchvalue;
    }
    async function re2(){
    await getinput();
    if(searchby=='searchusn')
    {
         await getusn(searchvalue);
    }
    if(searchby=='searchname')
    {
         await getname(searchvalue);
    }
    if(searchby=='searchcontact')
    {
         await getcontact(searchvalue);
    }
    res.render("searchres.ejs",{result2:result});
    };
    re2();
});


app.get("/edit",checkAuthenticated,function(req,res)
{
    async function re(){
        await getall();
        res.render("edit.ejs",{result:result});
        };
        re();
}
);

app.post("/edit",checkAuthenticated,function(req,res)
{   
    function inputdelete()
    {
        inpdelete=req.body.usn;
        console.log(inpdelete);
    }
    async function re1()
    {
        await inputdelete();
        await deleteusn(inpdelete);
        res.redirect("/getall");

    }
    async function re2()
    {
        await deleteall();
        res.redirect("/getall");

    }

    function inputedit()
    {
        inpedit=req.body.editvalues;
        console.log(inpedit)
    }
    async function re3()
    {
        await inputedit()
        await getusn(inpedit)
        res.render("updateform.ejs",{resultedit:result})
    }
    function inputedit()
    {
        inpedit=req.body.editvalues;
        console.log(inpedit)
    }
    

    function updateinput()
    {
        studentusn=req.body.studentusn;
        studentname=req.body.studentname;
        studentbranch=req.body.studentbranch;
        studentcourse=req.body.studentcourse;
        studentgender=req.body.studentgender;
        studentsemester=Number(req.body.studentsemester);
        studentpassingyear=req.body.studentpassingyear;
        studentgpa=Number(req.body.studentgpa);
        studentpercentage=Number(req.body.studentpercentage);
        studentemail=req.body.studentemail;
        studentdob=req.body.studentdob;
        studentbloodgroup=req.body.studentbloodgroup;
        studentnationality=req.body.studentnationality;
        studentfathersname=req.body.studentfathersname;
        studentmothersname=req.body.studentmothersname;
        studentcontact=req.body.studentcontact;
        studentparentcontact=req.body.studentparentcontact;
        studentaddress=req.body.studentaddress;
        studentincome=Number(req.body.studentincome);
    }
    async function re4()
    {
        await updateinput();
        await updatestudent(studentusn,studentname,studentbranch,studentcourse,studentgender,studentsemester,studentpassingyear,studentgpa,studentpercentage,studentemail,studentdob,studentbloodgroup,studentnationality,studentfathersname,studentmothersname,studentcontact,studentparentcontact,studentaddress,studentincome);
        res.redirect("/")
    }




     if(req.body.deletedatabase)
     {
         console.log("Deleting all data")
         re2();
     }
     else if(req.body.usn)
     {
    re1(); 
    }
    else if(req.body.editvalues)
    {
        re3();
    }else if(req.body.studentusn)
    {
        re4();
    }
    

});

app.get("/addnewdata",checkAuthenticated,function(req,res)
{
    res.render("newform");
});

app.post("/addnewdata",function(req,res)
{
    function input()
    {
        console.log(req.body);
        studentusn=req.body.studentusn;
        studentname=req.body.studentname;
        studentbranch=req.body.studentbranch;
        studentcourse=req.body.studentcourse;
        studentgender=req.body.studentgender;
        studentsemester=Number(req.body.studentsemester);
        studentpassingyear=req.body.studentpassingyear;
        studentgpa=Number(req.body.studentgpa);
        studentpercentage=Number(req.body.studentpercentage);
        studentemail=req.body.studentemail;
        studentdob=req.body.studentdob;
        studentbloodgroup=req.body.studentbloodgroup;
        studentnationality=req.body.studentnationality;
        studentfathersname=req.body.studentfathersname;
        studentmothersname=req.body.studentmothersname;
        studentcontact=req.body.studentcontact;
        studentparentcontact=req.body.studentparentcontact;
        studentaddress=req.body.studentaddress;
        studentincome=Number(req.body.studentincome);
    }
    async function adddata()
    {
        await input();
        await addstudentdata(studentusn,studentname,studentbranch,studentcourse,studentgender,studentsemester,studentpassingyear,studentgpa,studentpercentage,studentemail,studentdob,studentbloodgroup,studentnationality,studentfathersname,studentmothersname,studentcontact,studentparentcontact,studentaddress,studentincome);
        res.redirect("/")
        console.log(req.body,"Data Added")
    }

    adddata();
});

app.get("/search/group",checkAuthenticated,function(req,res)
{
    res.render("group.ejs")
});
app.post("/search/group",checkAuthenticated,function(req,res)
{
    function input()
    {
        att=req.body.searchby;
        val=req.body.searchval;
        if(att=='semester')
        {
            att='sem';
            val=Number(val);
        }
        if(att=='semester')
        {   att='sem'
            val=Number(val);
        }
        console.log(req.body)
    }
    async function run()
    {
        await input();
        await getgroupby(att,val);
        res.render("searchres.ejs",{result2:result});
    }
    run();
    
});

app.get("/search/groupv2",checkAuthenticated,function(req,res)
{
    res.render("groupv2.ejs")
});
app.post("/search/groupv2",checkAuthenticated,function(req,res)
{
    function input()
    {
        att1=req.body.searchby1;
        val1=req.body.searchval1;
        att2=req.body.searchby2;
        val2=req.body.searchval2;
        if(att1=='semester')
        {
            att1='sem';
            val1=Number(val1);
        }
        if(att2=='semester')
        {   att2='sem'
            val2=Number(val2);
        }
        console.log(req.body)
    }
    input();
    async function run()
    {
        await input();
        await getgroupv2by(att1,val1,att2,val2);
        res.render("searchres.ejs",{result2:result});
    }
    run();
    
});


app.delete('/logout',function(req,res)
{   
    req.logout()
    req.flash("success","Logged out !")
    res.redirect('/login')
})

app.listen(1001,function(){
    console.log("Server is running !!")
});






function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/home')
    }
    next()
  }


async function getall()
{
    let conn;
    try{
        conn=await odb.getConnection(config)

        result=await conn.execute(
            'select * from student order by name'
            )
            // console.log(result.rows)
            
    }
    catch(err)
    {
        console.log('Error!!',err)
    }
    finally
    {
        if(conn){
            await conn.close()
        }
    }
}




async function getusn(usn)
{
    let conn;
    try{
        conn=await odb.getConnection(config)

        result=await conn.execute(
            "select * from student where usn=:usn",[usn]
            
            )
    console.log(result);
            
    }
    catch(err)
    {
        console.log('Error!!',err)
    }
    finally
    {
        if(conn){
            await conn.close()
        }
    }
}
async function getname(name)
{
    let conn;
    try{
        conn=await odb.getConnection(config)

        result=await conn.execute(
            "select * from student where name=:name",[name]
            
            )
    console.log(result);
            
    }
    catch(err)
    {
        console.log('Error!!',err)
    }
    finally
    {
        if(conn){
            await conn.close()
        }
    }
}
async function getcontact(scontact)
{
    let conn;
    try{
        conn=await odb.getConnection(config)

        result=await conn.execute(
            "select * from student where scontact=:scontact",[scontact]
            
            )
    console.log(result);
            
    }
    catch(err)
    {
        console.log('Error!!',err)
    }
    finally
    {
        if(conn){
            await conn.close()
        }
    }
}



async function deleteall()
{
    let conn;
    try{
        conn=await odb.getConnection(config)
        await conn.execute(
            'delete from student',{},{autoCommit : true}
        )
    }
    catch(err)
    {
        console.log('Error!!',err)
    }
    finally
    {
        if(conn)
        {
            await conn.close()
        }
    }
}


async function deleteusn(usn)
{
    let conn;
    try{
        conn=await odb.getConnection(config)

        await conn.execute(
            'delete from student where usn=:usn',[usn],{autoCommit : true}
            )
        
           
        }
    catch(err)
    {
        console.log('Error!!',err)
    }
    finally
    {
        if(conn){
            await conn.close()
        }
        
    }
}

async function addstudentdata(studentusn,studentname,studentbranch,studentcourse,studentgender,studentsemester,studentpassingyear,studentgpa,studentpercentage,studentemail,studentdob,studentbloodgroup,studentnationality,studentfathersname,studentmothersname,studentcontact,studentparentcontact,studentaddress,studentincome)
{
    let conn;
    try{
        conn=await odb.getConnection(config)

        await conn.execute(
            "insert into student values(:studentusn,:studentname,:studentbranch,:studentcourse,:studentgender,:studentsemester,:studentpassingyear,:studentgpa,:studentpercentage,:studentemail,to_date(:studentdob,'YYYY-MM-DD'),:studentbloodgroup,:studentnationality,:studentfathersname,:studentmothersname,:studentcontact,:studentparentcontact,:studentaddress,:studentincome)",[studentusn,studentname,studentbranch,studentcourse,studentgender,studentsemester,studentpassingyear,studentgpa,studentpercentage,studentemail,studentdob,studentbloodgroup,studentnationality,studentfathersname,studentmothersname,studentcontact,studentparentcontact,studentaddress,studentincome],{autoCommit : true}
            )
            
           
        }
    catch(err)
    {
        console.log('Error!!',err)
    }
    finally
    {
        if(conn){
            await conn.close()
        }
    }
}

async function updatestudent(studentusn,studentname,studentbranch,studentcourse,studentgender,studentsemester,studentpassingyear,studentgpa,studentpercentage,studentemail,studentdob,studentbloodgroup,studentnationality,studentfathersname,studentmothersname,studentcontact,studentparentcontact,studentaddress,studentincome)
{
    let conn;
    try{
        conn=await odb.getConnection(config)

        await conn.execute(
            "update student set name=:studentname,branch=:studentbranch,course=:studentcourse,gender=:studentgender,sem=:studentsemester,year=:studentpassingyear,gpa=:studentgpa,pucgrade=:studentpercentage,email=:studentemail,dob=to_date(:studentdob,'YYYY-MM-DD'),blood=:studentbloodgroup,nationality=:studentnationality,fathersname=:studentfathersname,mothersname=:studentmothersname,scontact=:studentcontact,pcontact=:studentparentcontact,address=:studentaddress,income=:studentincome where usn=:studentusn",[studentname,studentbranch,studentcourse,studentgender,studentsemester,studentpassingyear,studentgpa,studentpercentage,studentemail,studentdob,studentbloodgroup,studentnationality,studentfathersname,studentmothersname,studentcontact,studentparentcontact,studentaddress,studentincome,studentusn],{autoCommit : true}
            )
       
           
        }
    catch(err)
    {
        console.log('Error!!',err)
    }
    finally
    {
        if(conn){
            await conn.close()
        }
    }
}
async function getgroupby(att,val)
{
    let conn;
    try{
        conn=await odb.getConnection(config)
        var s1="select * from student where "
        var res=s1.concat(att,"=:val order by name");
        result=await conn.execute(
            res,[val]
            
            )
    // console.log(result);
            
    }
    catch(err)
    {
        console.log('Error!!',err)
    }
    finally
    {
        if(conn){
            await conn.close()
        }
    }
}

async function getgroupv2by(att1,val1,att2,val2)
{
    let conn;
    try{
        conn=await odb.getConnection(config)
        var s1="select * from student where "
        var res=s1.concat(att1,"=:val1 and ",att2,"=:val2 ","order by name");
        console.log(res);
        result=await conn.execute(
            res,[val1,val2]
            
            )
    console.log(result);
            
    }
    catch(err)
    {
        console.log('Error!!',err)
    }
    finally
    {
        if(conn){
            await conn.close()
        }
    }
}