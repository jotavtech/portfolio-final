import { motion } from "framer-motion";

export default function About() {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="about" className="min-h-screen bg-black py-20 page-section">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-pixel text-4xl animate-glitch mb-2">SOBRE MIM</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </motion.div>
        
        {/* O carro Porsche foi removido */}
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div className="bg-white/5 p-6 border border-white/10" variants={itemVariants}>
              <h3 className="font-retro text-2xl mb-4">EXPERIÊNCIA</h3>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <p className="font-pixel">FREELANCES</p>
                  <p className="font-mono text-sm">2022-2025</p>
                </div>
                <p className="text-gray-400 text-sm mb-2 font-mono">Freelancer</p>
                <p className="font-mono text-sm">
                  Tenho experiência atuando como freelancer, desenvolvendo projetos web com foco em front-end 
                  utilizando HTML, CSS, JavaScript e React. Também possuo conhecimento em bancos de dados, o que me permite 
                  trabalhar em aplicações completas, desde a interface até a integração com o back-end.
                </p>
              </div>
            </motion.div>
            
            <motion.div className="bg-white/5 p-6 border border-white/10" variants={itemVariants}>
              <h3 className="font-retro text-2xl mb-4">EDUCAÇÃO</h3>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <p className="font-pixel">UNIESP (CABEDELO)</p>
                  <p className="font-mono text-sm">Formação em junho de 2026</p>
                </div>
                <p className="font-mono text-sm">Sistemas para Internet</p>
                <p className="font-mono text-sm text-gray-400">3º Período</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div className="bg-white/5 p-6 border border-white/10" variants={itemVariants}>
              <h3 className="font-retro text-2xl mb-8">INTERESSES</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 border border-white/20 text-center">
                  <h4 className="font-pixel mb-2">UI/UX</h4>
                  <p className="font-mono text-xs">Criação de interfaces e experiências de usuário intuitivas</p>
                </div>
                <div className="p-4 border border-white/20 text-center">
                  <h4 className="font-pixel mb-2">WEB</h4>
                  <p className="font-mono text-xs">Desenvolvimento front-end com foco em interfaces modernas</p>
                </div>
                <div className="p-4 border border-white/20 text-center">
                  <h4 className="font-pixel mb-2">MOBILE</h4>
                  <p className="font-mono text-xs">Aplicativos para Android e iOS com React Native</p>
                </div>
                <div className="p-4 border border-white/20 text-center">
                  <h4 className="font-pixel mb-2">DESIGN</h4>
                  <p className="font-mono text-xs">Design gráfico para web e identidade visual</p>
                </div>
                <div className="p-4 border border-white/20 text-center">
                  <h4 className="font-pixel mb-2">AUDIO</h4>
                  <p className="font-mono text-xs">Produção e edição de áudio para projetos digitais</p>
                </div>
                <div className="p-4 border border-white/20 text-center">
                  <h4 className="font-pixel mb-2">BACK-END</h4>
                  <p className="font-mono text-xs">Desenvolvimento de APIs e serviços web</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="bg-white/5 p-6 border border-white/10" variants={itemVariants}>
              <h3 className="font-retro text-2xl mb-4">IDIOMAS</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <p className="font-pixel mb-2">PORTUGUÊS</p>
                  <div className="h-2 bg-white/20">
                    <motion.div 
                      className="h-full bg-white" 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    ></motion.div>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="font-pixel mb-2">INGLÊS</p>
                  <div className="h-2 bg-white/20">
                    <motion.div 
                      className="h-full bg-white" 
                      initial={{ width: 0 }}
                      whileInView={{ width: "70%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 }}
                    ></motion.div>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="font-pixel mb-2">ESPANHOL</p>
                  <div className="h-2 bg-white/20">
                    <motion.div 
                      className="h-full bg-white" 
                      initial={{ width: 0 }}
                      whileInView={{ width: "50%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
